export enum NodeTypes {
  Paths = 'paths',
  Path = 'path',
  Operation = 'operation',
  Components = 'components',
  Models = 'models',
  Model = 'model',
}

export interface ISourceNodeMap {
  type: string;
  match?: string;
  notMatch?: string;
  children?: ISourceNodeMap[];
}
