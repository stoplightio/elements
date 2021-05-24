import React from 'react';
import { MenuStateReturn } from 'reakit/Menu';
export declare type MenuRadioGroupProps = {
    /**
     * The value of the active radio option.
     */
    value: string;
    /**
     * This function is called when the user selects a radio group option.
     */
    onChange: (value: string) => void;
    /**
     * Must contain one or more `MenuOption` elements.
     */
    children: React.ReactNode;
    /**
     * Not for external use.
     *
     * @private
     */
    __menu?: MenuStateReturn;
};
export declare const MenuRadioGroup: React.ForwardRefExoticComponent<MenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
