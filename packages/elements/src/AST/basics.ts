const nodeTypes = [
  'root',
  'service',
  'operation',
  'request',
  'response',
  'schema',
  'property',
  'string',
  'number',
  'boolean',
  'responseExample',
  'responseBody',
  'requestBody',
  'requestExample',
  'contact',
  'license',
  'server',
  'enum',
  'variable',
  'pathParam',
  'pathParams',
  'queryParam',
  'queryParams',
  'headerParam',
  'headerParams',
  'cookieParam',
  'cookieParams',
  'name',
  'description',
  'propertyExplode',
  'required',
  'propertyDeprecated',
  'propertyStyleCookieParam',
  'propertyStyleHeaderParam',
  'propertyStylePathParam',
  'propertyStyleQueryParam',
  'propertyAllowEmptyValue',
  'propertyAllowReserved',
  'httpMethod',
  'path',
  'propertyUrl',
  'propertyKey',
  'propertySummary',
  'propertyExample',
] as const;

export type NodeTypes = typeof nodeTypes;

export type NodeType = NodeTypes[number];

export interface IMagicNode<T extends NodeType = NodeType> {
  /** A permenant globally unique identifier. For example, can be a UUID or a ${clientId}-${vectorClock} like in YJS. */
  id: string;
  type: T;
}

export interface IParent extends IMagicNode {
  children: IMagicNode[];
}

export interface ILeaf extends IMagicNode {
  parent: IMagicNode;
}

export interface IBranch extends ILeaf, IParent {}

// Basic Leaf types

export interface IString<S extends string = string> extends ILeaf {
  type: 'string';
  value: S;
}

export interface INumber<N extends number = number> extends ILeaf {
  type: 'number';
  value: N;
}

export interface IBool<B extends boolean = boolean> extends ILeaf {
  type: 'boolean';
  value: B;
}

export interface IEnum<B extends IMagicNode = IMagicNode> extends ILeaf {
  type: 'enum';
  value: B[];
}

export interface IProperty<K extends IMagicNode = IMagicNode, T extends IMagicNode = IMagicNode> extends ILeaf {
  type: 'property';
  key?: K;
  value?: T;
}
