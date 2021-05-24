import React from 'react';
import { PolymorphicComponentProps } from '../Box';
export declare type PanelOwnProps = {
    /**
     * The contents of the panel.
     *
     * A Panel.Titlebar must be the first child element.
     */
    children: React.ReactNode;
    /**
     * Wether the panel should be rounded. Applies rounded "lg" and overflow hidden.
     *
     * Usually only use this on root panel components, not nested panel components.
     */
    rounded?: boolean;
    /**
     * Controls how the panel will appear.
     *
     * @default 'default'
     */
    appearance?: 'default' | 'minimal';
    /**
     * Enable collapsing
     */
    isCollapsible?: boolean;
    /**
     * Identifier to use for aria controls when collapse is enabled
     */
    id?: string;
    /**
     * Controls whether to show the panel contents or not by default in.
     *
     * If defaultIsOpen is provided the panel will be uncontrolled.
     */
    defaultIsOpen?: boolean;
    /**
     * Controls whether to show the panel contents or not.
     *
     * If no onChange is provided, isOpen will be used as the default value (uncontrolled).
     */
    isOpen?: boolean;
    /**
     * Called when the collapsed state changes.
     *
     * When not provided, the component will control it's own state internally (uncontrolled).
     */
    onChange?: (value: boolean) => void;
};
export declare type PanelProps = PolymorphicComponentProps<'div', PanelOwnProps>;
export declare const Panel: {
    ({ appearance, id, className, children, isCollapsible, isOpen: isOpenProp, defaultIsOpen, onChange, rounded, ...extraProps }: PanelProps): JSX.Element;
    Titlebar: React.NamedExoticComponent<import("./PanelTitlebar").IPanelTitlebar>;
    Content: React.FC<import("../Box").BoxOwnProps<React.ElementType<any>>>;
};
