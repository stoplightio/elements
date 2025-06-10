import { Box, Flex, VStack } from '@stoplight/mosaic';
import React, { useEffect, useMemo, useState } from 'react';

interface LazySchemaTreePreviewerProps {
  schema: any;
  root?: any;
  title?: string;
  level?: number;
  path?: string;
  maskState?: Record<string, { checked: boolean; required: 0 | 1 | 2 }>;
  setMaskState?: React.Dispatch<React.SetStateAction<Record<string, { checked: boolean; required: 0 | 1 | 2 }>>>;
  hideData?: Array<{ path: string }>; // Updated hideData format
}

const TYPES = ['string', 'integer', 'boolean'];

function resolvePointer(obj: any, pointer: string) {
  const parts = pointer.replace(/^#\//, '').split('/');
  return parts.reduce((acc, key) => acc && acc[key], obj);
}

/* circular reference */
function detectCircularPath(path: string): boolean {
  const ignored = ['properties', 'items'];
  const parts = path.split('/').filter(part => !ignored.includes(part));
  for (let i = 0; i < parts.length - 1; i++) {
    const current = parts[i];

    const rest = parts.slice(i + 1);

    if (rest.includes(current)) {
      return true;
    }
  }
  return false;
}

function dereference(node: any, root: any, visited: Set<string> = new Set(), depth = 0, maxDepth = 10): any {
  if (!node || typeof node !== 'object') return node;
  if (depth > maxDepth) return node;

  if (node.$ref || node['x-iata-$ref']) {
    let refPath = node.$ref || node['x-iata-$ref'];
    refPath = refPath.replace('__bundled__', 'definitions');
    if (visited.has(refPath)) return { circular: true, $ref: refPath };

    visited.add(refPath);
    const target = resolvePointer(root, refPath);
    return dereference(target, root, new Set(visited), depth + 1, maxDepth);
  }

  if (Array.isArray(node)) {
    return node.map(item => dereference(item, root, new Set(visited), depth + 1, maxDepth));
  }

  const result: Record<string, any> = {};
  for (const key in node) {
    result[key] = dereference(node[key], root, new Set(visited), depth + 1, maxDepth);
  }
  return result;
}

function persistOnlyParentDisabled(maskObj: Record<string, { checked: boolean; required: 0 | 1 | 2 }>) {
  const disabledParents: string[] = [];

  for (const [path, value] of Object.entries(maskObj)) {
    const childPaths = Object.keys(maskObj).filter(p => p.startsWith(`${path}/`));
    const allChildrenDisabled = childPaths.length > 0 && childPaths.every(p => !maskObj[p]?.checked);

    if (!value.checked && (childPaths.length === 0 || allChildrenDisabled)) {
      disabledParents.push(path);
    }
  }
}

const LazySchemaTreePreviewer: React.FC<LazySchemaTreePreviewerProps> = ({
  schema,
  root = schema,
  title,
  level = 1,
  path = 'properties',
  maskState,
  setMaskState,
  hideData = [], // Default to an empty array
}) => {
  const [expanded, setExpanded] = useState(false);

  const [_maskState, _setMaskState] = useState<Record<string, { checked: boolean; required: 0 | 1 | 2 }>>(() => {
    const stored = localStorage.getItem('disabledProps');
    const disabledPaths = stored ? (JSON.parse(stored) as string[]) : [];

    const initialState: Record<string, { checked: boolean; required: 0 | 1 | 2 }> = {};
    for (const p of disabledPaths) {
      initialState[p] = { checked: false, required: 0 };
    }
    return initialState;
  });

  const finalMaskState = maskState ?? _maskState;
  const finalSetMaskState = useMemo(
    () =>
      setMaskState ??
      ((updater: any) => {
        _setMaskState(prev => {
          const updated = updater(prev);
          persistOnlyParentDisabled(updated);
          return updated;
        });
      }),
    [setMaskState],
  );

  useEffect(() => {
    if (!(path in finalMaskState)) {
      finalSetMaskState(prev => ({
        ...prev,
        [path]: { checked: true, required: 0 },
      }));
    }
  }, [path, finalMaskState, finalSetMaskState]);

  const shouldHideNode = useMemo(() => {
    console.log('hide data-', hideData);
    console.log('Array.isArray(hideData)', Array.isArray(hideData));
    if (Array.isArray(hideData)) {
      return hideData.some(hideEntry => hideEntry.path === path); // Check if the current path matches any hideData entry
    }
    return false;
  }, [path, hideData]);

  if (!schema || shouldHideNode) return null; // Skip rendering if node should be hidden entirely

  const displayTitle =
    level === 1 && (title === undefined || path === 'properties') ? 'Root' : title ?? schema?.title ?? 'Node';

  const handleToggle = () => {
    const circular = detectCircularPath(path);
    if (!circular) {
      setExpanded(prev => !prev);
    }
  };

  const renderChildren = () => {
    if (!expanded) return null;

    const children: JSX.Element[] = [];
    if (schema.circular) {
      return <li className="ml-6 text-red-600">↻ Circular Ref: {schema.$ref}</li>;
    }

    if (schema.type === 'object' && schema.properties) {
      for (const [key, child] of Object.entries(schema.properties)) {
        const resolved = dereference(child, root);
        //const childPath = path === 'properties' ? `${path}/${key}` : `${path}/properties/${key}`;
        const childPath = `${path}/${key}`;

        if (Array.isArray(hideData) && !hideData.some(hideEntry => hideEntry.path === childPath)) {
          children.push(
            <li key={key}>
              <LazySchemaTreePreviewer
                schema={resolved || root.title}
                root={root}
                title={key}
                level={level + 1}
                path={childPath}
                maskState={finalMaskState}
                setMaskState={finalSetMaskState}
                hideData={hideData} // Pass hideData down to children
              />
            </li>,
          );
        }
      }
    } else if (schema.type === 'array' && schema.items) {
      const resolvedItems = dereference(schema.items, root);
      const childPath = `${path}/items`;

      if (Array.isArray(hideData) && !hideData.some(hideEntry => hideEntry.path === childPath)) {
        children.push(
          <li key="items">
            <LazySchemaTreePreviewer
              schema={resolvedItems}
              root={root}
              title="items"
              level={level + 1}
              path={childPath}
              maskState={finalMaskState}
              setMaskState={finalSetMaskState}
              hideData={hideData} // Pass hideData down to children
            />
          </li>,
        );
      }
    }

    return <ul className="ml-6 border-l border-gray-200 pl-2">{children}</ul>;
  };

  return (
    <div className="mb-1">
      <Flex maxW="full" pl={3} py={2} data-test="schema-row" pos="relative">
        <VStack spacing={1} maxW="full" className="w-full">
          <Flex onClick={handleToggle} className="w-full cursor-pointer">
            {/* <span className="mr-1 text-xs">{expanded ? '▼' : '▶'}</span> */}
            {!TYPES.includes(schema?.type) ? (
              <span className="mr-1 text-xs">{expanded ? '▼' : '▶'}</span>
            ) : (
              <span className="mr-1 text-xs"></span>
            )}
            <Box mr={2} fontFamily="mono" fontWeight="semibold">
              {displayTitle}
            </Box>
            <span className="text-gray-500">{schema?.title || schema?.type || root.title}</span>
          </Flex>
        </VStack>
      </Flex>
      {renderChildren()}
    </div>
  );
};

export default LazySchemaTreePreviewer;
