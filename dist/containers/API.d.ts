import { RoutingProps } from '@stoplight/elements-core';
import * as React from 'react';
export declare type APIProps = APIPropsWithDocument | APIPropsWithUrl;
export declare type APIPropsWithUrl = {
    apiDescriptionUrl: string;
} & CommonAPIProps;
export declare type APIPropsWithDocument = {
    apiDescriptionDocument: string | object;
    apiDescriptionUrl?: string;
} & CommonAPIProps;
export interface CommonAPIProps extends RoutingProps {
    layout?: 'sidebar' | 'stacked';
    logo?: string;
    customConfig?: any;
    hideTryIt?: boolean;
    hideSchemas?: boolean;
    hideInternal?: boolean;
    hideExport?: boolean;
    tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
    tryItCorsProxy?: string;
}
export declare const APIImpl: React.FC<APIProps>;
export declare const API: React.FC<APIProps>;
