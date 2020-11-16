import * as React from 'react';
import { FAIconProp } from '../FAIcon';
export declare type TableOfContentsItem = {
    name: React.ReactNode;
    className?: string;
    onClick?: () => void;
    depth?: number;
    isSelected?: boolean;
    isActive?: boolean;
    meta?: React.ReactNode;
    footer?: React.ReactNode;
    type?: 'divider' | 'group' | 'item';
    icon?: FAIconProp;
    activeIcon?: FAIconProp;
    iconColor?: string;
    iconPosition?: 'left' | 'right';
    textIcon?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    showSkeleton?: boolean;
    action?: {
        icon?: FAIconProp;
        name?: string;
        isActive?: boolean;
        onClick: any;
    };
};
export declare type SelectItem = {
    name: React.ReactNode;
    value: string;
    label?: string;
};
export declare type ITableOfContentsLink = TableOfContentsItem & {
    to?: string;
    exact?: boolean;
    isExternalLink?: boolean;
};
export declare type RowComponentProps<T extends TableOfContentsItem, E = {}> = {
    item: T;
    index: number;
    isExpanded: boolean;
    toggleExpanded: () => void;
} & ({} extends E ? {} : {
    extra: E;
});
export declare type RowComponentType<T extends TableOfContentsItem, E = {}> = (props: React.PropsWithChildren<RowComponentProps<T, E>>) => React.ReactElement<any, any> | null;
export declare type ITableOfContents<T extends TableOfContentsItem = TableOfContentsItem, E = {}> = {
    contents: T[];
    padding?: string;
    className?: string;
    rowComponent?: RowComponentType<T, E>;
    'data-test'?: string;
    title?: string;
    isOpen?: boolean;
    onClose?: () => void;
    enableDrawer?: boolean | number;
    withScroller?: boolean;
} & ({} extends E ? {
    rowComponentExtraProps?: undefined;
} : {
    rowComponentExtraProps: E;
});
export declare function TableOfContents<T extends TableOfContentsItem = TableOfContentsItem, E = {}>({ className, 'data-test': dataTest, padding, title, isOpen, onClose, withScroller, ...innerProps }: ITableOfContents<T, E>): JSX.Element;
declare function DefaultRowImpl<T extends TableOfContentsItem>({ item, isExpanded, toggleExpanded }: RowComponentProps<T>): JSX.Element;
declare namespace DefaultRowImpl {
    var displayName: string;
}
export declare const DefaultRow: React.MemoExoticComponent<typeof DefaultRowImpl>;
export {};
