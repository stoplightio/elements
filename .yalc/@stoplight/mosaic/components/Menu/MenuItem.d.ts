import { IconName } from '@fortawesome/fontawesome-common-types';
import React, { ReactNode } from 'react';
export declare const MENU_ITEM_IDENT_WIDTH = "20px";
export declare type MenuItemProps = {
    /**
     * The text to display in the menu item.
     */
    text: ReactNode;
    /**
     * Optional element to render on the right side of the menu item. Use this to display keyboard shortcut, badge counts, etc.
     */
    meta?: ReactNode;
    /**
     * Render menu item with extra space on the left side. Useful to align menus when some items are checkbox items.
     */
    indent?: boolean;
    /**
     * If true or false is provided, menu item will render with indent={true}, and a checkbox icon when true.
     */
    checked?: boolean;
    /**
     * If provided, the menu item will render as a link with target="_blank". href must be an absolute url.
     */
    href?: string;
    /**
     * When disabled is true the MenuItem is rendered as semi-transparent and cannot be interacted with.
     */
    disabled?: boolean;
    /**
     * Optional additional logic to run when MenuItem is clicked (or triggered in any way, such as via keyboard shortcut).
     */
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * For use when nesting menus, if you want the submenu to have a particular label. Gets forwarded through to the `Menu.label` prop.
     */
    label?: string;
    /**
     * If children are supplied then this MenuItem will render a submenu when active. Must contain `MenuItem`, `MenuDivider`, or `MenuRadioGroup` components.
     */
    children?: React.ReactNode;
    /**
     * If provided, MenuItem will render with icon on left-hand side.
     */
    icon?: IconName;
    /**
     * If provided, icon on left-hand side of menu will adopt specified color.
     */
    iconColor?: string;
    /**
     * Not for external use, this property is used by the Menu component when rendering submenus.
     *
     * @private
     */
    __hasSubmenu?: boolean;
    /**
     * Not for external use, this property is used by the menu component when rendering items.
     *
     * @private
     */
    __active?: boolean;
};
export declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLDivElement>>;
