import * as React from 'react';
import { AppearanceVals, OrientationVals } from './variants';
export declare type TabsOwnProps = {
    /**
     * Must contain `TabList` and `TabPanel` components.
     */
    children: React.ReactNode;
    /**
     * The current selected tab's `id`.
     * If provided and `onChange` is not provided, this value acts as a default value.
     */
    selectedId?: string;
    /**
     * Callback for when the selected tab state changes.
     * When provided you are expected to manage `selectedId` (controlled mode).
     */
    onChange?: (selectedId: string) => void;
    /**
     * Defines the direction the tabs are displayed. Defaults to `horizontal`.
     */
    orientation?: OrientationVals;
    /**
     * Alter the tabs overall appearance - defaults to `minimal`.
     */
    appearance?: AppearanceVals;
};
export declare const Tabs: React.ForwardRefExoticComponent<TabsOwnProps & React.RefAttributes<import("@react-types/shared").DOMRefValue<HTMLDivElement>>>;
