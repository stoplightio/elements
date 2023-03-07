import { ExportButtonProps } from '@stoplight/elements-core';
import * as React from 'react';
import { ServiceNode } from '../../utils/oas/types';
declare type SidebarLayoutProps = {
    serviceNode: ServiceNode;
    logo?: string;
    hideTryIt?: boolean;
    hideSchemas?: boolean;
    hideInternal?: boolean;
    hideExport?: boolean;
    exportProps?: ExportButtonProps;
    tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
    tryItCorsProxy?: string;
};
export declare const APIWithSidebarLayout: React.FC<SidebarLayoutProps>;
export {};
