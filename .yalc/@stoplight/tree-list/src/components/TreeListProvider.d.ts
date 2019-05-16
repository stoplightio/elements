import * as React from 'react';
import { ITreeListClassNames, ITreeListContext, ITreeListProvider } from '../types';
declare const TreeContext: React.Context<ITreeListContext>;
declare const ClassNamesContext: React.Context<ITreeListClassNames>;
declare const TreeListProvider: React.FunctionComponent<ITreeListProvider>;
export { TreeListProvider, TreeContext, ClassNamesContext };
