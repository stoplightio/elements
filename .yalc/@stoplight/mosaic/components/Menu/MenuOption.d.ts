import React from 'react';
import { MenuItemProps } from './MenuItem';
export declare type MenuOptionProps = {
    /**
     * The option value to send when this item is selected.
     */
    value: string;
} & MenuItemProps;
export declare const MenuOption: React.ForwardRefExoticComponent<{
    /**
     * The option value to send when this item is selected.
     */
    value: string;
} & MenuItemProps & React.RefAttributes<HTMLDivElement>>;
