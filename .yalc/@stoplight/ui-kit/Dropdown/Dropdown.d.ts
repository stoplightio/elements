import * as React from 'react';
import { ISelectProps, Select } from '../Select';
export interface IDropdown extends Omit<ISelectProps<string>, 'itemRenderer'> {
    baseComponent: new (props: ISelectProps<string>) => Select<string>;
    itemRenderer?: ISelectProps<string>['itemRenderer'];
    itemSize?: number;
    maxRows?: number;
}
export declare const Dropdown: React.FunctionComponent<IDropdown>;
