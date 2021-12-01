import * as React from 'react';
import { GoToRefHandler, RowAddonRenderer, ViewMode } from '../types';
export declare type JSVOptions = {
    defaultExpandedDepth: number;
    viewMode: ViewMode;
    onGoToRef?: GoToRefHandler;
    renderRowAddon?: RowAddonRenderer;
    hideExamples?: boolean;
    renderRootTreeLines?: boolean;
    disableCrumbs?: boolean;
};
export declare const useJSVOptionsContext: () => JSVOptions;
export declare const JSVOptionsContextProvider: React.Provider<JSVOptions>;
