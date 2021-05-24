/// <reference types="react" />
import { CollectionChildren } from '@react-types/shared';
import { FontSizeVals } from '../../enhancers';
import { DensityVals } from './variants';
export declare type TabListOwnProps = {
    children: CollectionChildren<any>;
    /**
     * Font size of the tabs - defaults to inheriting whatever the font size of parent container is.
     */
    fontSize?: FontSizeVals;
    /**
     * Controls the amount of space and padding for the tabs. Defaults to `regular`.
     */
    density?: DensityVals;
};
/**
 * A TabList is used within Tabs to group tabs that a user can switch between.
 * The keys of the items within the <TabList> must match up with a corresponding item inside the <TabPanels>.
 */
export declare function TabList({ fontSize, density, ...props }: TabListOwnProps): JSX.Element;
