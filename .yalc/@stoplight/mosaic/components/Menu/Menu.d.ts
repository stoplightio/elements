import React from 'react';
import { MenuOptions as BaseMenuOptions } from 'reakit/Menu';
export declare type MenuProps = {
    /**
     * The react element that when clicked / triggered will open the menu. The menu will be positioned around this trigger element.
     */
    trigger: React.ReactElement;
    /**
     * Must contain `MenuItem`, `MenuDivider`, or `MenuRadioGroup` components.
     */
    children: React.ReactNode;
    /**
     * Optional unique identifier.
     */
    baseId?: BaseMenuOptions['baseId'];
    /**
     * Optional label that describes the purpose of the menu. Helpful for accessibility.
     */
    label?: string;
};
export declare const Menu: (props: MenuProps) => JSX.Element;
