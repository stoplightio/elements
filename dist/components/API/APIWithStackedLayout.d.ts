import { ExportButtonProps } from '@stoplight/elements-core';
import * as React from 'react';
import { ServiceNode } from '../../utils/oas/types';
declare type TryItCredentialsPolicy = 'omit' | 'include' | 'same-origin';
declare type StackedLayoutProps = {
    serviceNode: ServiceNode;
    hideTryIt?: boolean;
    hideExport?: boolean;
    exportProps?: ExportButtonProps;
    tryItCredentialsPolicy?: TryItCredentialsPolicy;
    tryItCorsProxy?: string;
};
export declare const APIWithStackedLayout: React.FC<StackedLayoutProps>;
export {};
