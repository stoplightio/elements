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
  hideData?: Array<{ path: string }>;
  parentRequired?: string[];
  propertyKey?: string;
}

interface SchemaWithMinItems {
  minItems?: number;
}

interface SchemaWithEnum {
  enum?: any[];
}

type Schema = SchemaWithMinItems | SchemaWithEnum | object;

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

function dereference(node: any, root: any, visited: WeakSet<object> = new WeakSet(), depth = 0, maxDepth = 10): any {
  if (!node || typeof node !== 'object') return node;
  if (depth > maxDepth) return node;

  if (node.$ref || node['x-iata-$ref']) {
    let refPath = node.$ref || node['x-iata-$ref'];
    refPath = refPath.replace('__bundled__', 'definitions');
    if (visited.has(node))
      return { circular: true, $ref: refPath, title: node.title, type: 'any', description: node.description };

    visited.add(node); // Add the node itself, not refPath
    const target = resolvePointer(root, refPath);
    return dereference(target || node, root, visited, depth + 1, maxDepth);
  }

  if (Array.isArray(node)) {
    return node.map(item => dereference(item, root, visited, depth + 1, maxDepth));
  }

  const result: Record<string, any> = {};
  for (const key in node) {
    result[key] = dereference(node[key], root, visited, depth + 1, maxDepth);
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
  hideData = [],
  parentRequired,
  propertyKey,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isRoot = level === 1 && (title === undefined || path === 'properties');
  const [_maskState, _setMaskState] = useState<Record<string, { checked: boolean; required: 0 | 1 | 2 }>>(() => {
    const stored = localStorage.getItem('disabledProps');
    const disabledPaths = stored ? (JSON.parse(stored) as string[]) : [];

    const initialState: Record<string, { checked: boolean; required: 0 | 1 | 2 }> = {};
    if (disabledPaths) {
      for (const p of disabledPaths) {
        const { path }: any = p;
        initialState[path] = { checked: false, required: 0 };
      }
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
      finalSetMaskState((prev: typeof finalMaskState) => ({
        ...prev,
        [path]: { checked: true, required: 0 },
      }));
      // For root: always expanded
      if (isRoot && !expanded) setExpanded(true);
    }
    // eslint-disable-next-line
  }, [path, finalMaskState, finalSetMaskState]);

  const shouldHideNode = useMemo(() => {
    return hideData.some(hideEntry => hideEntry.path === path);
  }, [path, hideData]);

  if (!schema || shouldHideNode) return null;

  const displayTitle =
    level === 1 && (title === undefined || path === 'properties') ? '' : title ?? schema?.title ?? 'Node';

  const handleToggle = () => {
    const circular = detectCircularPath(path);
    if (!circular) {
      setExpanded(prev => !prev);
    }
  };

  const renderChildren = () => {
    if (!expanded && !isRoot) return null;

    const children: JSX.Element[] = [];
    /*
    // no need to show message for circular references here, as dereference will handle it
    if (schema?.circular) {
      return <li className="ml-6 text-red-600">↻ Circular Ref: {schema?.$ref}</li>;
    }
    */

    if (schema?.type === 'object' && schema?.properties) {
      for (const [key, child] of Object.entries(schema?.properties)) {
        const childPath = `${path}/${key}`;

        if (!hideData.some(hideEntry => hideEntry.path === childPath)) {
          children.push(
            <li key={key}>
              <LazySchemaTreePreviewer
                schema={dereference(child, root)}
                root={root}
                title={key}
                level={level + 2}
                path={childPath}
                maskState={finalMaskState}
                setMaskState={finalSetMaskState}
                hideData={hideData}
                parentRequired={schema?.required}
                propertyKey={key}
              />
            </li>,
          );
        }
      }
    }
    // CHANGED: For array, do NOT render an "items" node, render children of items directly (if items is object or array)
    else if (
      schema?.type === 'array' &&
      schema?.items &&
      Object.keys(schema?.items).length > 0 &&
      !schema?.items?.circular
    ) {
      const resolvedItems = dereference(schema?.items, root);
      // If items is an object with properties, render its properties directly
      if (resolvedItems && resolvedItems.type === 'object' && resolvedItems.properties) {
        for (const [key, child] of Object.entries(resolvedItems.properties)) {
          const childPath = `${path}/items/${key}`;
          if (!hideData.some(hideEntry => hideEntry.path === childPath)) {
            children.push(
              <li key={key}>
                <LazySchemaTreePreviewer
                  schema={dereference(child, root)}
                  root={root}
                  title={key}
                  level={level + 2}
                  path={childPath}
                  maskState={finalMaskState}
                  setMaskState={finalSetMaskState}
                  hideData={hideData}
                  parentRequired={resolvedItems.required}
                  propertyKey={key}
                />
              </li>,
            );
          }
        }
      }
      // If items is an array, render recursively
      else if (resolvedItems && resolvedItems.type === 'array' && resolvedItems.items) {
        const childPath = `${path}/items`;
        // Recursively handle array-of-arrays
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
              hideData={hideData}
              parentRequired={schema?.required}
              propertyKey="items"
            />
          </li>,
        );
      }
      // If items is a primitive or something else, render as a single child
      else {
        const childPath = `${path}/items`;
        if (!hideData.some(hideEntry => hideEntry.path === childPath)) {
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
                hideData={hideData}
                parentRequired={schema?.required}
                propertyKey="items"
              />
            </li>,
          );
        }
      }
    }
    // If array's items is missing or empty, do NOT render an "items" node at all
    return children.length > 0 ? <ul className="ml-6 border-l border-gray-200 pl-2">{children}</ul> : null;
  };

  const renderMinEnums = (schema: Schema) => {
    if (!schema || typeof schema !== 'object') return null;
    const boxStyle: any = {
      background: 'rgba(245, 247, 250, 0.5)',
      border: '1px solid #a0aec0',
      borderRadius: '4px',
      padding: '0px 2px',
      display: 'inline-block',
      overflowWrap: 'break-word',
      textAlign: 'left',
      maxWidth: 'fit-content',
      maxHeight: 'fit-content',
    };
    if ('minItems' in schema) {
      const schemaWithMinItems = schema as SchemaWithMinItems; // Type assertion
      if (typeof schemaWithMinItems.minItems === 'number') {
        return (
          <Box className="sl-text-muted" fontFamily="ui" fontWeight="normal" mr={2} style={boxStyle}>
            {`>=${schemaWithMinItems.minItems} items`}
          </Box>
        );
      }
    }

    if ('enum' in schema && Array.isArray((schema as SchemaWithEnum).enum)) {
      return (
        <div>
          Allowed values:{' '}
          {(schema as SchemaWithEnum).enum!.map((val, idx) => (
            <Box key={idx} className="sl-text-muted" fontFamily="ui" fontWeight="normal" mr={2} style={boxStyle}>
              {val}
            </Box>
          ))}
        </div>
      );
    }
    return null;
  };

  // Show required if this property is in parentRequired
  const isRequired = parentRequired && propertyKey && parentRequired.includes(propertyKey);

  return (
    <div className="mb-1">
      <Flex maxW="full" pl={3} py={2} data-test="schema-row" pos="relative">
        <VStack spacing={1} maxW="full" className="w-full">
          <Flex onClick={!isRoot ? handleToggle : undefined} className={`w-full ${isRoot ? '' : 'cursor-pointer'}`}>
            {!isRoot ? (
              <Box mr={2} fontFamily="mono" fontWeight="semibold">
                {!TYPES.includes(schema?.type) && !isRoot ? (
                  <i
                    role="img"
                    aria-hidden="true"
                    className={`sl-icon fal ${expanded ? 'fa-chevron-down' : 'fa-chevron-right'} fa-fw fa-sm`}
                  ></i>
                ) : (
                  <span className="mr-1 text-xs"></span>
                )}
                {' ' + displayTitle}
              </Box>
            ) : null}
            {!isRoot ? (
              <Box mr={2} fontFamily="mono" fontWeight="light">
                <span className="text-gray-500">
                  {schema?.type === 'object' ? schema?.title : schema?.type || root?.title}
                  {schema?.items && schema?.items?.title !== undefined ? ` [${schema?.items?.title}] ` : null}
                </span>
                <span className="text-gray-500">{schema?.format !== undefined ? `<${schema?.format}>` : null}</span>
              </Box>
            ) : null}
          </Flex>
          {/*!isRoot ? ( */}
          <Flex pl={1} w="full" align="start" direction="col" style={{ overflow: 'visible' }}>
            {schema?.description && (
              <Box fontFamily="ui" fontWeight="light">
                <span className="text-gray-500">{schema?.description}</span>
              </Box>
            )}
            {schema?.examples !== undefined && (
              <Flex align="center" mb={1} style={{ flexWrap: 'wrap' }}>
                <span className="text-gray-500" style={{ marginRight: 8, flexShrink: 0 }}>
                  Example
                </span>
                <Box
                  className="sl-text-muted"
                  fontFamily="ui"
                  fontWeight="normal"
                  mr={2}
                  style={{
                    background: 'rgba(245, 247, 250, 0.5)',
                    border: '1px solid #a0aec0',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    display: 'inline-block',
                    overflowWrap: 'break-word',
                    textAlign: 'left',
                    maxWidth: '530px',
                  }}
                >
                  {JSON.stringify(schema?.examples)}
                </Box>
              </Flex>
            )}
          </Flex>
          {/*}) : null}*/}
          {schema && typeof schema === 'object' && ('minItems' in schema || 'enum' in schema) && renderMinEnums(schema)}
        </VStack>
        {!isRoot && (
          <label className="inline-flex items-center ml-2">
            <Box mr={2} fontFamily="mono" fontWeight="normal">
              <div>{isRequired && <span style={{ color: 'red', marginLeft: '10px' }}>required</span>}</div>
            </Box>
          </label>
        )}
      </Flex>
      {renderChildren()}
    </div>
  );
};

export default LazySchemaTreePreviewer;
