import React from 'react';
import { AvatarProps } from '../Avatar';
import { IIconProps } from '../Icon';
declare type BaseEntityNameProps = {
    name: string;
    className?: string;
    isHeading?: boolean;
    size?: 'md' | 'lg';
    avatar?: AvatarProps;
};
declare type IconEntityNameProps = BaseEntityNameProps & {
    icon: IIconProps['icon'];
};
declare type AvatarEntityNameProps = BaseEntityNameProps & {
    avatar: AvatarProps;
};
export declare type EntityNameProps = BaseEntityNameProps | IconEntityNameProps | AvatarEntityNameProps;
export declare const EntityName: React.MemoExoticComponent<React.ForwardRefExoticComponent<EntityNameProps & React.RefAttributes<HTMLDivElement>>>;
export {};
