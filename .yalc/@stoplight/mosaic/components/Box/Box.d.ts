import React from 'react';
import { BoxProps } from './types';
declare const defaultElement = "div";
export declare const Box: <E extends React.ElementType = typeof defaultElement>(props: BoxProps<E>) => JSX.Element;
export {};
