/// <reference types="react" />
import { IconLookup, IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
export declare type FAIconName = IconName;
export declare type FAIconTuple = [IconPrefix, FAIconName];
export declare type FAIconProp = FAIconName | FAIconTuple | IconLookup;
export interface IIcon {
    icon: FAIconProp;
    className?: string;
    size?: 'xs' | 'sm' | 'lg' | '2x' | '3x' | '5x' | '7x' | '10x';
    style?: any;
}
export declare const FAIcon: ({ icon, className, size, style }: IIcon) => JSX.Element;
