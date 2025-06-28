import { Box, Flex, VStack } from '@stoplight/mosaic';
import React, { useMemo, useState } from 'react';

const MOCK_DISABLE_PROPS = {
  data: {},
  disableProps: {
    response: [
      {
        paths: [{ path: 'properties/hold' }, { path: 'properties/balanceArmAftMeasure/properties/unitCode' }],
        location: 'properties/test1',
      },
      {
        paths: [{ path: 'properties/positionCode' }, { path: 'properties/balanceArmAftMeasure/properties/value' }],
        location: 'properties/test2/test21',
      },
    ],
    request: [],
  },
};

interface LazySchemaTreePreviewerProps {
  schema: any;
  root?: any;
  title?: string;
  level?: number;
  path?: string;
  hideData?: any;
  parentRequired?: string[];
  propertyKey?: string;
  currentLocation?: string;
}

interface SchemaWithMinItems {
  minItems?: number;
}

interface SchemaWithEnum {
  enum?: any[];
}

type Schema = SchemaWithMinItems | SchemaWithEnum | object;

const TYPES = ['string', 'integer', 'boolean', 'any'];

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

function getHidePathsForLocation(hideData: any, currentLocation: string): string[] {
  if (!hideData?.disableProps?.response) return [];

  const hidePaths: string[] = [];

  for (const disableGroup of hideData.disableProps.response) {
    // Remove trailing slash and normalize location comparison
    const normalizedDisableLocation = disableGroup.location.replace(/\/$/, '');
    const normalizedCurrentLocation = currentLocation.replace(/\/$/, '');

    console.log('🔍 Comparing locations:', {
      disableLocation: normalizedDisableLocation,
      currentLocation: normalizedCurrentLocation,
      match: normalizedDisableLocation === normalizedCurrentLocation,
    });

    if (normalizedDisableLocation === normalizedCurrentLocation) {
      for (const pathItem of disableGroup.paths) {
        if (typeof pathItem === 'string') {
          hidePaths.push(pathItem);
        } else if (pathItem.path) {
          hidePaths.push(pathItem.path);
        }
      }
    }
  }

  console.log('📋 Hide paths for location', currentLocation, ':', hidePaths);
  return hidePaths;
}

const LazySchemaTreePreviewer: React.FC<LazySchemaTreePreviewerProps> = ({
  schema,
  root = schema,
  title,
  level = 1,
  path = 'properties',
  hideData = MOCK_DISABLE_PROPS,
  parentRequired,
  propertyKey,
  currentLocation = 'properties',
}) => {
  const [expanded, setExpanded] = useState(false);
  const isRoot = level === 1 && (title === undefined || path === 'properties');

  console.log('🔧 Component render:', {
    title,
    path,
    currentLocation,
    level,
    schemaType: schema?.type,
  });

  // Get hide paths for current location
  const hidePathsForLocation = useMemo(() => {
    return getHidePathsForLocation(hideData, currentLocation);
  }, [hideData, currentLocation]);

  // Check if current node should be hidden
  const shouldHideNode = useMemo(() => {
    const shouldHide = hidePathsForLocation.includes(path);
    console.log('❓ Should hide node?', {
      path,
      shouldHide,
      hidePathsForLocation,
      title,
    });
    return shouldHide;
  }, [path, hidePathsForLocation, title]);

  if (!schema || shouldHideNode) {
    console.log('🚫 Hiding node:', { title, path, reason: !schema ? 'no schema' : 'should hide' });
    return null;
  }

  const displayTitle =
    level === 1 && (title === undefined || path === 'properties') ? '' : title ?? schema?.title ?? 'Node';

  const handleToggle = () => {
    const circular = detectCircularPath(path);
    if (!circular) {
      setExpanded(prev => !prev);
    }
  };

  // const renderChildren = () => {
  //   console.log('🔍 renderChildren called with:', {
  //     path,
  //     currentLocation,
  //     title,
  //     schemaType: schema?.type,
  //     hasProperties: !!schema?.properties,
  //     expanded,
  //     isRoot,
  //   });

  //   if (!expanded && !isRoot) return null;

  //   const children: JSX.Element[] = [];

  //   if (schema?.type === 'object' && schema?.properties) {
  //     console.log('🏗️ Processing object properties:', Object.keys(schema.properties));

  //     for (const [key, child] of Object.entries(schema?.properties)) {
  //       const childPath = `${path}/${key}`;
  //       const resolvedChild = dereference(child, root);

  //       // Debug the child resolution
  //       console.log('🔧 Processing child:', {
  //         key,
  //         childPath,
  //         currentLocation,
  //         childType: resolvedChild?.type,
  //         hasNestedProperties: !!(resolvedChild?.type === 'object' && resolvedChild?.properties),
  //         resolvedChildKeys: resolvedChild?.properties ? Object.keys(resolvedChild.properties) : null,
  //       });

  //       // Update location logic
  //       let childLocation: string;

  //       if (resolvedChild?.type === 'object' && resolvedChild?.properties) {
  //         childLocation = childPath; // becomes "properties/balanceArmAftMeasure"
  //         console.log('✅ Updating location for nested object:', {
  //           key,
  //           from: currentLocation,
  //           to: childLocation,
  //         });
  //       } else {
  //         childLocation = currentLocation; // stays "properties"
  //         console.log('➡️ Keeping same location for primitive/simple object:', {
  //           key,
  //           location: childLocation,
  //         });
  //       }

  //       console.log('🚀 Creating child component:', {
  //         key,
  //         childPath,
  //         childLocation,
  //         willPassLocation: childLocation,
  //       });

  //       children.push(
  //         <li key={key}>
  //           <LazySchemaTreePreviewer
  //             schema={resolvedChild}
  //             root={root}
  //             title={key}
  //             level={level + 2}
  //             path={childPath}
  //             hideData={hideData}
  //             parentRequired={schema?.required}
  //             propertyKey={key}
  //             currentLocation={childLocation}
  //           />
  //         </li>,
  //       );
  //     }
  //   } else if (
  //     schema?.type === 'array' &&
  //     schema?.items &&
  //     Object.keys(schema?.items).length > 0 &&
  //     !schema?.items?.circular
  //   ) {
  //     console.log('🏗️ Processing array items');
  //     const resolvedItems = dereference(schema?.items, root);
  //     if (resolvedItems && resolvedItems.type === 'object' && resolvedItems.properties) {
  //       for (const [key, child] of Object.entries(resolvedItems.properties)) {
  //         const childPath = `${path}/items/${key}`;
  //         const childLocation = `${currentLocation}/items`;

  //         console.log('🔧 Processing array item child:', {
  //           key,
  //           childPath,
  //           childLocation,
  //         });

  //         children.push(
  //           <li key={key}>
  //             <LazySchemaTreePreviewer
  //               schema={dereference(child, root)}
  //               root={root}
  //               title={key}
  //               level={level + 2}
  //               path={childPath}
  //               hideData={hideData}
  //               parentRequired={resolvedItems.required}
  //               propertyKey={key}
  //               currentLocation={childLocation}
  //             />
  //           </li>,
  //         );
  //       }
  //     } else if (resolvedItems && resolvedItems.type === 'array' && resolvedItems.items) {
  //       const childPath = `${path}/items`;
  //       const childLocation = `${currentLocation}/items`;

  //       console.log('🔧 Processing nested array:', {
  //         childPath,
  //         childLocation,
  //       });

  //       children.push(
  //         <li key="items">
  //           <LazySchemaTreePreviewer
  //             schema={resolvedItems}
  //             root={root}
  //             title="items"
  //             level={level + 1}
  //             path={childPath}
  //             hideData={hideData}
  //             parentRequired={schema?.required}
  //             propertyKey="items"
  //             currentLocation={childLocation}
  //           />
  //         </li>,
  //       );
  //     } else {
  //       const childPath = `${path}/items`;
  //       const childLocation = `${currentLocation}/items`;

  //       console.log('🔧 Processing simple array items:', {
  //         childPath,
  //         childLocation,
  //       });

  //       children.push(
  //         <li key="items">
  //           <LazySchemaTreePreviewer
  //             schema={resolvedItems}
  //             root={root}
  //             title="items"
  //             level={level + 1}
  //             path={childPath}
  //             hideData={hideData}
  //             parentRequired={schema?.required}
  //             propertyKey="items"
  //             currentLocation={childLocation}
  //           />
  //         </li>,
  //       );
  //     }
  //   }

  //   console.log('📋 renderChildren returning', children.length, 'children');
  //   return children.length > 0 ? <ul className="ml-6 border-l border-gray-200 pl-2">{children}</ul> : null;
  // };

  // working code
  const renderChildren = () => {
    console.log('path - ', path, 'currentLocation - ', currentLocation);

    if (!expanded && !isRoot) return null;

    const children: JSX.Element[] = [];

    if (schema?.type === 'object' && schema?.properties) {
      for (const [key, child] of Object.entries(schema?.properties)) {
        const childPath = `${path}/${key}`;
        const resolvedChild = dereference(child, root);

        // Simple rule: if child is an object with properties, update location to childPath
        const childLocation =
          resolvedChild?.type === 'object' && resolvedChild?.properties
            ? childPath // becomes "properties/balanceArmAftMeasure"
            : currentLocation; // stays "properties"

        console.log('Child:', key, 'Path:', childPath, 'Location:', childLocation);

        children.push(
          <li key={key}>
            <LazySchemaTreePreviewer
              schema={resolvedChild}
              root={root}
              title={key}
              level={level + 2}
              path={childPath}
              hideData={hideData}
              parentRequired={schema?.required}
              propertyKey={key}
              currentLocation={childLocation}
            />
          </li>,
        );
      }
    }
    // ... rest of array handling stays the same

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

  return (
    <div className="mb-1">
      <Flex maxW="full" pl={3} py={2} data-test="schema-row" pos="relative">
        <VStack spacing={1} maxW="full" className="w-full">
          <Flex onClick={!isRoot ? handleToggle : undefined} className={`w-full ${isRoot ? '' : 'cursor-pointer'}`}>
            {!isRoot ? (
              <Box mr={2} className="sl-font-mono sl-font-semibold sl-mr-2">
                {!TYPES.includes(schema?.type) && !schema?.circular && !schema?.items?.circular ? (
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
              {isRequired && (
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
