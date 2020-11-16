import { ReactNode } from 'react';
import { RefractorNode } from 'refractor/core';
export declare function astToReact(depth?: number): (child: RefractorNode, i: number) => ReactNode;
