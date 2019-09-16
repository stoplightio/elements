/// <reference types="react" />
import { RequestMaker } from '../stores';
export declare const RequestMakerProvider: React.ProviderExoticComponent<React.ProviderProps<RequestMaker>>;
export declare function useStore(): RequestMaker;
export declare function useStore(name: 'request'): RequestMaker['request'];
export declare function useStore(name: 'response'): RequestMaker['response'];
