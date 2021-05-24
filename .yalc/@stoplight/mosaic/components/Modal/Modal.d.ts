import React, { LegacyRef } from 'react';
export declare type ModalProps = {
    /**
     * The content to render in the Modal.
     */
    children: React.ReactNode;
    /**
     * The content to render in the footer slot.
     */
    footer?: React.ReactElement | string;
    /**
     * Whether the Modal is open.
     */
    isOpen: boolean;
    /**
     * Called when the Modal closes.
     */
    onClose: () => void;
    /**
     * When true the user will be able to interact with content behind the modal, and move the modal around.
     */
    isDraggable?: boolean;
    /**
     * Whether to prevent closing the overlay when the user interacts outside of it.
     */
    isNotDismissable?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'full' | 'grow';
} & ModalConditionalProps;
export declare type ModalConditionalProps = {
    title?: React.ReactElement | string;
} | {
    renderHeader: (props: {
        containerProps: ModalBoxProps['moveProps'];
        titleProps: ModalBoxProps['titleProps'];
        onClose?: ModalBoxProps['onClose'];
    }) => React.ReactElement;
};
export declare const useModalState: () => {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};
export declare const Modal: React.FC<ModalProps>;
declare type ModalBoxProps = Pick<ModalProps, 'children' | 'footer' | 'onClose' | 'isDraggable' | 'size'> & ModalConditionalProps & {
    ref: LegacyRef<HTMLDivElement>;
    containerProps: Omit<React.HTMLAttributes<HTMLElement>, 'color'>;
    dialogProps: Omit<React.HTMLAttributes<HTMLElement>, 'color'>;
    titleProps: Omit<React.HTMLAttributes<HTMLElement>, 'color'>;
    moveProps?: Omit<React.HTMLAttributes<HTMLElement>, 'color'>;
    position?: {
        x: number;
        y: number;
    };
    isHidden?: boolean;
    isNotDismissable?: boolean;
};
export {};
