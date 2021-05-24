import { DOMRef, DOMRefValue } from '@react-types/shared';
import React, { RefObject } from 'react';
export declare function useDOMRef<T extends HTMLElement = HTMLElement>(ref: DOMRef<T>, skip?: boolean): RefObject<T>;
declare type WithDomRefProps = {
    children: React.FunctionComponentElement<any>;
};
export declare const WithDomRef: React.ForwardRefExoticComponent<WithDomRefProps & React.RefAttributes<DOMRefValue<HTMLElement>>>;
export declare function useUnwrapDOMRef<T extends HTMLElement>(ref: RefObject<DOMRefValue<T>>): RefObject<T>;
export {};
