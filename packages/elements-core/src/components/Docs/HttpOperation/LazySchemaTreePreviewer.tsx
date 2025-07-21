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
  hideData?: Array<{ path: string; required?: boolean }>;
  parentRequired?: string[];
  propertyKey?: string;
  _subType?: string;
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
    if (refPath.includes('#/%24defs')) {
      refPath = refPath.replace('#/%24defs', '$defs');
    } else {
      refPath = refPath.replace('__bundled__', 'definitions');
    }
    if (visited.has(node))
      return { circular: true, $ref: refPath, title: node.title, type: 'any', description: node.description };

    visited.add(node);
    const target = resolvePointer(root, refPath);
    if (!target) return node;
    const result = { ...target };
    if ('description' in node) result.description = node.description;
    if ('title' in node) result.title = node.title;
    return dereference(result, root, visited, depth + 1, maxDepth);
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
  return str.replace(/^\/|\/$/g, '');
};

function isPropertiesAllHidden(path: string, hideData: Array<{ path: string; required?: boolean }>) {
  const current = trimSlashes(path);
  const parts = current.split('/');
  for (let i = parts.length; i >= 2; i--) {
    if (parts[i - 1] === 'properties') {
      const ancestorPropPath = parts.slice(0, i).join('/');
      const block = hideData.find(
        h => trimSlashes(h.path) === ancestorPropPath && ancestorPropPath.endsWith('/properties'),
      );
      if (block && block.required === undefined) {
        return true;
      }
    }
  }
  return false;
}

function isRequiredOverride(path: string, hideData: Array<{ path: string; required?: boolean }>) {
  const entry = hideData.find(h => trimSlashes(h.path) === trimSlashes(path));
  return entry && typeof entry.required === 'boolean' ? entry.required : undefined;
}

// New utility for array/items-based hiding
function isPathHidden(path: string, hideData: Array<{ path: string; required?: boolean }>) {
  const normalizedPath = trimSlashes(path);

  // Direct match (root-level or property-level)
  const direct = hideData.find(h => trimSlashes(h.path) === normalizedPath);
  if (direct && direct.required === undefined) return true;

  // Check for ancestor "properties" disables (properties/carr/properties, etc)
  if (isPropertiesAllHidden(path, hideData)) return true;

  // Check for array/items disables: e.g. properties/aircraftGroup/items/aircraft/items/aircraftGroup
  // Go up the path looking for a hideData.path which is a prefix of this path and ends with '/items/[field]'
  for (const h of hideData) {
    const hPath = trimSlashes(h.path);
    if (h.required !== undefined) continue;
    // Must be prefix
    if (
      normalizedPath.length > hPath.length &&
      normalizedPath.startsWith(hPath) &&
      // hPath is items/field (array hiding)
      (hPath.endsWith('/items') || (hPath.match(/\/items\/[^\/]+$/) && normalizedPath.startsWith(hPath + '/')))
    ) {
      // Hide all descendants under this path
      return true;
    }
  }

  return false;
}

const LazySchemaTreePreviewer: React.FC<LazySchemaTreePreviewerProps> = ({
  schema,
  root = schema,
  title,
  level = 1,
  path = '',
  hideData = [],
  parentRequired,
  propertyKey,
  _subType,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSchemaIndex, setSelectedSchemaIndex] = useState(0);
  const [showSchemaDropdown, setShowSchemaDropdown] = useState(false);
  const [isHoveringSelector, setIsHoveringSelector] = useState(false);
  const isRoot = level === 1 && (title === undefined || path === '');
  const [_maskState, _setMaskState] = useState<Record<string, { checked: boolean; required: 0 | 1 | 2 }>>(() => {
    const disabledPaths = hideData || [];
    const initialState: Record<string, { checked: boolean; required: 0 | 1 | 2 }> = {};
    if (disabledPaths) {
      for (const p of disabledPaths) {
        const { path }: any = p;
        initialState[path] = { checked: false, required: 0 };
      }
    }
    return initialState;
  });

  useEffect(() => {
    setSelectedSchemaIndex(0);
  }, [schema?.anyOf, schema?.oneOf]);
  const thisNodeRequiredOverride = isRequiredOverride(path, hideData);

  const shouldHideAllChildren =
    (isRoot && hideData.some(h => trimSlashes(h.path) === 'properties' && h.required === undefined)) ||
    (!isRoot && isPropertiesAllHidden(path, hideData));

  const shouldHideNode = useMemo(() => {
    if (isRoot) return false;
    if (isPathHidden(path, hideData) && thisNodeRequiredOverride === undefined) return true;
    return false;
  }, [path, hideData, isRoot, thisNodeRequiredOverride]);

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
    if (shouldHideAllChildren) return null;
    if (!expanded && !isRoot) return null;

    const children: JSX.Element[] = [];

    if (schema?.type === 'object' && (schema?.properties || schema?.allOf || schema?.anyOf || schema?.oneOf)) {
      let props = schema?.properties;

      if (schema?.allOf) {
        schema?.allOf.forEach((item: any) => {
          props = { ...props, ...item.properties };
        });
      }
      if (schema?.anyOf && schema?.anyOf.length > 0) {
        const selectedSchema = schema?.anyOf[selectedSchemaIndex] || schema?.anyOf[0];
        props = { ...props, ...selectedSchema.properties };
      }
      if (schema?.oneOf && schema?.oneOf.length > 0) {
        const selectedSchema = schema?.oneOf[selectedSchemaIndex] || schema?.oneOf[0];
        props = { ...props, ...selectedSchema.properties };
      }

      for (const [key, child] of Object.entries(props || {})) {
        const childPath = `${path}/properties/${key}`;
        const childRequiredOverride = isRequiredOverride(childPath, hideData);
        const shouldHideChild = isPathHidden(childPath, hideData) && childRequiredOverride === undefined;

        const resolved = dereference(child, root);
        if (!shouldHideChild) {
          children.push(
            <li key={key}>
              <LazySchemaTreePreviewer
                schema={resolved}
                root={root}
                title={key}
                level={level + 1}
                path={childPath}
                hideData={hideData}
                parentRequired={schema?.required}
                propertyKey={key}
                _subType={resolved?.items?.type}
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
          const childPath = `${itemsPath}/properties/${key}`;
          const childRequiredOverride = isRequiredOverride(childPath, hideData);
          const shouldHideChild = isPathHidden(childPath, hideData) && childRequiredOverride === undefined;

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
                  _subType={resolvedItems?.items?.type}
                />
              </li>,
            );
          }
        }
      } else if (resolvedItems && resolvedItems.type === 'array' && resolvedItems.items.length > 0) {
        const childPath = `${path}/items`;
        const childRequiredOverride = isRequiredOverride(childPath, hideData);
        const shouldHideChild = isPathHidden(childPath, hideData) && childRequiredOverride === undefined;

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
                _subType={resolvedItems?.items?.type}
              />
            </li>,
          );
        }
      }
    }
    return children.length > 0 ? <ul className="ml-6 border-l border-gray-200 pl-2">{children}</ul> : null;
  };

  const combinedSchemaSelector = () => {
    return (
      <>
        <Box
          pos="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="transparent"
          style={{ zIndex: 999 }}
          onClick={() => setShowSchemaDropdown(false)}
        />
        <Box
          pos="absolute"
          bg="canvas"
          rounded
          boxShadow="md"
          style={{
            zIndex: 1000,
            top: '100%',
            left: 0,
            minWidth: '150px',
            maxWidth: '200px',
            marginTop: '2px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
          fontSize="sm"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {(schema?.anyOf || schema?.oneOf)?.map((schemaOption: any, index: number) => (
            <Box
              key={index}
              px={3}
              py={2}
              cursor="pointer"
              bg={selectedSchemaIndex === index ? 'primary-tint' : 'canvas'}
              fontSize="xs"
              display="flex"
              alignItems="center"
              style={{
                borderBottom:
                  index < (schema?.anyOf || schema?.oneOf).length - 1 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
                gap: '8px',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                if (selectedSchemaIndex !== index) {
                  e.currentTarget.style.backgroundColor = 'var(--sl-color-canvas-tint)';
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                if (selectedSchemaIndex !== index) {
                  e.currentTarget.style.backgroundColor = 'var(--sl-color-canvas)';
                }
              }}
              onClick={() => {
                setSelectedSchemaIndex(index);
                setShowSchemaDropdown(false);
              }}
            >
              <Box flex={1} color="body">
                {schemaOption.type || 'object'}
              </Box>
              {selectedSchemaIndex === index && (
                <Box color="primary" fontSize="xs">
                  ✓
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </>
    );
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

  if (schema?.$ref) {
    // eslint-disable-next-line no-param-reassign
    schema = dereference(schema, root);
  }

  return (
    <div className="mb-1">
      <Flex maxW="full" pl={3} py={2} data-test="schema-row" pos="relative">
        <VStack spacing={1} maxW="full" className="w-full">
          <Flex onClick={!isRoot ? handleToggle : undefined} className={`w-full ${isRoot ? '' : 'cursor-pointer'}`}>
            {!isRoot ? (
              <Box mr={2} className="sl-font-mono sl-font-semibold sl-mr-2">
                {!TYPES.includes(schema?.type) &&
                !detectCircularPath(path) &&
                !schema?.items?.circular &&
                !schema?.circular ? (
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
              <Box mr={2} pos="relative">
                <Box
                  display="inline-flex"
                  alignItems="center"
                  onMouseEnter={() => {
                    if (schema?.anyOf || schema?.oneOf) {
                      setIsHoveringSelector(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!showSchemaDropdown) {
                      setIsHoveringSelector(false);
                    }
                  }}
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (schema?.anyOf || schema?.oneOf) {
                      e.stopPropagation();
                      setShowSchemaDropdown(prev => !prev);
                    }
                  }}
                  style={{
                    cursor: schema?.anyOf || schema?.oneOf ? 'pointer' : 'default',
                  }}
                >
                  <span className="sl-truncate sl-text-muted">
                    {(() => {
                      let typeDisplay =
                        schema?.type === 'object' && schema?.title ? schema?.title : schema?.type || root?.title;

                      if (schema?.anyOf && schema?.anyOf.length > 0) {
                        return `any of ${typeDisplay}`;
                      } else if (schema?.oneOf && schema?.oneOf.length > 0) {
                        return `one of ${typeDisplay}`;
                      }

                      return typeDisplay;
                    })()}
                    {schema?.items && schema?.items?.title !== undefined ? ` [${schema?.items?.title}] ` : null}
                  </span>
                  {(schema?.anyOf || schema?.oneOf) && (
                    <Box
                      display="inline-flex"
                      alignItems="center"
                      ml={1}
                      style={{
                        opacity: isHoveringSelector ? 1 : 0.6,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      <i
                        className="sl-icon fas fa-chevron-down"
                        style={{
                          fontSize: '10px',
                          opacity: 0.6,
                        }}
                      />
                    </Box>
                  )}
                </Box>
                <span className="text-gray-500">{schema?.format !== undefined ? `<${schema?.format}>` : null}</span>
                {(schema?.anyOf || schema?.oneOf) && showSchemaDropdown && combinedSchemaSelector()}
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
