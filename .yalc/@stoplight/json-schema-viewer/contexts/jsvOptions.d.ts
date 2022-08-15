import * as React from 'react';
import { GoToRefHandler, NodeHasChangedFn, RowAddonRenderer, ViewMode } from '../types';
export declare type JSVOptions = {
    defaultExpandedDepth: number;
    viewMode: ViewMode;
    onGoToRef?: GoToRefHandler;
    renderRowAddon?: RowAddonRenderer;
    hideExamples?: boolean;
    renderRootTreeLines?: boolean;
    disableCrumbs?: boolean;
    nodeHasChanged?: NodeHasChangedFn;
};
export declare const useJSVOptionsContext: () => JSVOptions;
export declare const JSVOptionsContextProvider: React.Provider<JSVOptions>;
