import { Node, Parent } from '@stoplight/markdown/ast-types/unist';
import * as React from 'react';
import { IComponentMapping } from '../types';
export declare const renderNodeChildren: (node: Node | Parent, components: IComponentMapping) => React.ReactNode[] | null;
