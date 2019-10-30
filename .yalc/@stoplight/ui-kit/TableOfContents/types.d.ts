import { IconName } from '@blueprintjs/icons';
import { NodeType } from '@stoplight/types';
export interface IContentsNode {
    name: string;
    depth: number;
    isActive?: boolean;
    href?: string;
    type?: 'divider' | 'group' | 'item';
    icon?: IconName;
}
export declare type IconMapType = NodeType | 'group' | 'divider' | 'item';
export declare type NodeIconMapping = {
    [type in IconMapType]?: IconName;
};
