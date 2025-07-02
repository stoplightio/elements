import { Box, Flex, VStack } from '@stoplight/mosaic';
import React, { useMemo, useState } from 'react';

interface LazySchemaTreePreviewerProps {
  schema: any;
  root?: any;
  title?: string;
  level?: number;
  path?: string; // This should be the absolute path from the root schema
  maskState?: Record<string, { checked: boolean; required: 0 | 1 | 2 }>;
  setMaskState?: React.Dispatch<React.SetStateAction<Record<string, { checked: boolean; required: 0 | 1 | 2 }>>>;
  hideData?: Array<{ path: string; required?: boolean }>; // hideData will now contain full absolute paths
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

const TYPES = ['string', 'integer', 'boolean', 'any', 'number'];

function resolvePointer(obj: any, pointer: string) {
  const parts = pointer.replace(/^#\//, '').split('/');
  return parts.reduce((acc, key) => acc && acc[key], obj);
}

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

    visited.add(node);
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

const trimSlashes = (str: string) => {
  return str.replace(/^\/|\/$/g, ''); // Removes leading and trailing slashes
};

const LazySchemaTreePreviewer: React.FC<LazySchemaTreePreviewerProps> = ({
  schema,
  root = schema,
  title,
  level = 1,
  path = '',
  hideData = [],
  parentRequired,
  propertyKey,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isRoot = level === 1 && (title === undefined || path === '');
  const [_maskState, _setMaskState] = useState<Record<string, { checked: boolean; required: 0 | 1 | 2 }>>(() => {
    const disabledPaths = hideData || [];
    console.log('disabledPaths==>', disabledPaths);
    const initialState: Record<string, { checked: boolean; required: 0 | 1 | 2 }> = {};
    if (disabledPaths) {
      for (const p of disabledPaths) {
        const { path }: any = p;
        initialState[path] = { checked: false, required: 0 };
      }
    }
    return initialState;
  });

  const shouldHideNode = useMemo(() => {
    const currentPath = trimSlashes(path);
    console.log('Current LazySchemaTreePreviewer Node Path:', path, 'Title:');
    console.log('hideData', hideData, 'path:', path);

    const data = hideData.some(hideEntry => {
      const hideEntryPath = trimSlashes(hideEntry.path);
      console.log('hideEntry:', hideEntry, 'path:', path);
      console.log('hideEntry updated:', hideEntryPath, 'path updated', currentPath);

      console.log('hideEntry result :', hideEntryPath === currentPath);
      return hideEntryPath === currentPath;
    });
    console.log('shouldHideNode==>', data);
    return data;
  }, [path, hideData]);

  if (!schema || shouldHideNode) {
    return null;
  }

  const displayTitle = level === 1 && (title === undefined || path === '') ? '' : title ?? schema?.title ?? 'Node';

  const handleToggle = () => {
    const circular = detectCircularPath(path);
    if (!circular) {
      setExpanded(prev => !prev);
    }
  };

  const renderChildren = () => {
    if (!expanded && !isRoot) return null;

    const children: JSX.Element[] = [];

    if (schema?.type === 'object' && schema?.properties) {
      for (const [key, child] of Object.entries(schema?.properties)) {
        const childPath = `${path}/properties/${key}`;

        const shouldHideChild = hideData.some(hideEntry => trimSlashes(hideEntry.path) === trimSlashes(childPath));
        console.log('childPath==>', childPath, 'shouldHideChild==>', shouldHideChild);
        if (!shouldHideChild) {
          children.push(
            <li key={key}>
              <LazySchemaTreePreviewer
                schema={dereference(child, root)}
                root={root}
                title={key}
                level={level + 1}
                path={childPath}
                hideData={hideData}
                parentRequired={schema?.required}
                propertyKey={key}
              />
            </li>,
          );
        }
      }
    } else if (
      schema?.type === 'array' &&
      schema?.items &&
      Object.keys(schema?.items).length > 0 &&
      !schema?.items?.circular
    ) {
      const resolvedItems = dereference(schema?.items, root);
      const itemsPath = `${path}/items`;

      if (resolvedItems && resolvedItems.type === 'object' && resolvedItems.properties) {
        for (const [key, child] of Object.entries(resolvedItems.properties)) {
          // Path for properties within array items - adjusted to include 'properties' (KEPT)
          const childPath = `${itemsPath}/properties/${key}`;
          const shouldHideChild = hideData.some(hideEntry => trimSlashes(hideEntry.path) === trimSlashes(childPath)); // Normalizing paths here too
          console.log('else if childPath==>', childPath, 'shouldHideChild==>', shouldHideChild);

          if (!shouldHideChild) {
            children.push(
              <li key={key}>
                <LazySchemaTreePreviewer
                  schema={dereference(child, root)}
                  root={root}
                  title={key}
                  level={level + 2}
                  path={childPath}
                  hideData={hideData}
                  parentRequired={resolvedItems.required}
                  propertyKey={key}
                />
              </li>,
            );
          }
        }
      } else if (resolvedItems && resolvedItems.type === 'array' && resolvedItems.items) {
        const nestedItemsPath = `${itemsPath}/items`;

        const shouldHideChild = hideData.some(
          hideEntry => trimSlashes(hideEntry.path) === trimSlashes(nestedItemsPath),
        );
        console.log('else if second shouldHideChild==>', shouldHideChild);

        if (!shouldHideChild) {
          children.push(
            <li key="items">
              <LazySchemaTreePreviewer
                schema={resolvedItems}
                root={root}
                title="items"
                level={level + 1}
                path={nestedItemsPath}
                hideData={hideData}
                parentRequired={schema?.required}
                propertyKey="items"
              />
            </li>,
          );
        }
      } else {
        const childPath = `${path}/items`;

        const shouldHideChild = hideData.some(hideEntry => trimSlashes(hideEntry.path) === trimSlashes(childPath)); // Normalizing paths here too
        console.log('else block childPath==>', childPath, 'shouldHideChild==>', shouldHideChild);

        if (!shouldHideChild) {
          children.push(
            <li key="items">
              <LazySchemaTreePreviewer
                schema={resolvedItems}
                root={root}
                title="items"
                level={level + 1}
                path={childPath}
                hideData={hideData}
                parentRequired={schema?.required}
                propertyKey="items"
              />
            </li>,
          );
        }
      }
    }
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
      const schemaWithMinItems = schema as SchemaWithMinItems;
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

  const isRequired = parentRequired && propertyKey && parentRequired.includes(propertyKey);

  let showRequiredLabel = false;
  const hideDataEntry = hideData.find(hideEntry => trimSlashes(hideEntry.path) === trimSlashes(path));
  if (hideDataEntry?.required === true || (hideDataEntry?.required === undefined && isRequired)) {
    showRequiredLabel = true;
  }

  return (
    <div className="mb-1">
      <Flex maxW="full" pl={3} py={2} data-test="schema-row" pos="relative">
        <VStack spacing={1} maxW="full" className="w-full">
          <Flex onClick={!isRoot ? handleToggle : undefined} className={`w-full ${isRoot ? '' : 'cursor-pointer'}`}>
            {!isRoot ? (
              <Box mr={2} className="sl-font-mono sl-font-semibold sl-mr-2">
                {!TYPES.includes(schema?.type) && !schema?.items?.circular && !schema?.circular ? (
                  <i
                    role="img"
                    aria-hidden="true"
                    className={`sl-icon fal ${expanded ? 'fa-chevron-down' : 'fa-chevron-right'} fa-fw fa-sm`}
                  ></i>
                ) : (
                  <span className="sl-icon fal fa-fw fa-sm" aria-hidden="true"></span>
                )}
                {' ' + displayTitle}
              </Box>
            ) : null}
            {!isRoot ? (
              <Box mr={2}>
                <span className="sl-truncate sl-text-muted">
                  {schema?.type === 'object' ? schema?.title : schema?.type || root?.title}
                  {schema?.items && schema?.items?.title !== undefined ? ` [${schema?.items?.title}] ` : null}
                </span>
                <span className="text-gray-500">{schema?.format !== undefined ? `<${schema?.format}>` : null}</span>
              </Box>
            ) : null}
          </Flex>
          <Flex pl={1} w="full" align="start" direction="col" style={{ overflow: 'visible', paddingLeft: '20px' }}>
            {schema?.description && (
              <Box fontFamily="ui" fontWeight="light">
                <span className="sl-prose sl-markdown-viewer" style={{ fontSize: '12px' }}>
                  {schema?.description}
                </span>
              </Box>
            )}
            {!isRoot && schema?.examples !== undefined && (
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
          <Flex pl={1} w="full" align="start" direction="col" style={{ overflow: 'visible', paddingLeft: '20px' }}>
            {schema &&
              typeof schema === 'object' &&
              ('minItems' in schema || 'enum' in schema) &&
              renderMinEnums(schema)}
          </Flex>
        </VStack>
        {!isRoot && (
          <label className="inline-flex items-top ml-2">
            <Box mr={2} fontFamily="ui" fontWeight="normal">
              {showRequiredLabel && (
                <div className="sl-ml-2 sl-text-warning">
                  <span style={{ marginLeft: '10px' }}>required</span>
                </div>
              )}
            </Box>
          </label>
        )}
      </Flex>
      {renderChildren()}
    </div>
  );
};

export default LazySchemaTreePreviewer;
