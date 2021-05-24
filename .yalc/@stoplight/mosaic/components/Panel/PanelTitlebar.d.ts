import React from 'react';
import { BoxOwnProps, IBoxHTMLAttributes } from '../Box/types';
declare type AppearanceVals = 'default' | 'minimal';
export interface IPanelTitlebar extends BoxOwnProps, Omit<IBoxHTMLAttributes, 'title'> {
    /**
     * The contents to render on the right side of the titlebar.
     *
     * This component will not toggle the collapsed state if clicked.
     */
    rightComponent?: React.ReactNode;
    /**
     * Titlebar background color.
     */
    bg?: 'canvas-100' | 'canvas-200' | 'canvas-300' | 'transparent';
    /**
     * The icon to render to the left of the titlebar children.
     *
     * If collapse is enabled, this prop will be overridden with a caret icon.
     */
    icon?: React.ReactNode;
    /**
     * Controls how the titlebar will appear.
     */
    appearance?: AppearanceVals;
}
export declare const PanelTitlebar: React.NamedExoticComponent<IPanelTitlebar>;
export {};
