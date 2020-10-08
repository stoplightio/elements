const nodeTypes = [
  'root',
  'service',
  'operation',
  'request',
  'response',
  'schema',
  'responseExample',
  'responseBody',
  'requestBody',
  'requestExample',
  'contact',
  'license',
  'server',
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
  'explode',
  'required',
  'deprecated',
  'propertyStyleCookieParam',
  'propertyStyleHeaderParam',
  'propertyStylePathParam',
  'propertyStyleQueryParam',
  'style',
  'param',
  'allowEmptyValue',
  'allowReserved',
  'httpMethod',
  'httpStatus',
  'path',
  'url',
  'key',
  'summary',
  'email',
  'example',
  'version',
  'termsOfService',
  'responses',
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
