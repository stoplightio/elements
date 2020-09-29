export type NodeType =
  | 'root'
  | 'service'
  | 'operation'
  | 'request'
  | 'response'
  | 'query'
  | 'object'
  | 'property'
  | 'string'
  | 'number'
  | 'boolean'
  | 'responseExample'
  | 'responseBody'
  | 'requestBody'
  | 'requestExample'
  | 'contact'
  | 'license'
  | 'server'
  | 'enum'
  | 'variable'
  | 'pathParam'
  | 'queryParam'
  | 'headerParam'
  | 'cookieParam';

export interface IMagicNode {
  /** A permenant globally unique identifier. For example, can be a UUID or a ${clientId}-${vectorClock} like in YJS. */
  id: string;
  type: NodeType;
}

export interface IParent extends IMagicNode {
  children: IMagicNode[];
}

export interface ILeaf extends IMagicNode {
  parent: IMagicNode;
}

export interface IBranch extends ILeaf, IParent {}

export interface IRoot extends IParent {
  type: 'root';
  parent: undefined;
}

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

export interface IEnum<B extends IMagicNode> extends ILeaf {
  type: 'enum';
  value: B[];
}

export interface IProperty<K extends IMagicNode, T extends IMagicNode> extends ILeaf {
  type: 'property';
  key?: K;
  value?: T;
}
