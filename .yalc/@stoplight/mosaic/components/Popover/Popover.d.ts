import React, { ReactElement, RefObject } from 'react';
import { MaybeRenderProp, Placement } from '../../utils';
import { BoxOwnProps } from '../Box';
/**
 * Expose a select set of props to customize the popover wrapper
 */
declare type PopoverBoxProps = Pick<BoxOwnProps, 'p'>;
export declare type PopoverProps = {
    /**
     * The element that will trigger the Popover. Should be a button in most cases. Can use a function for more control.
     */
    renderTrigger: MaybeRenderProp<{
        isOpen: boolean;
    }, ReactElement>;
    /**
     * The content to render in the Popover. Can use a function to access Popover state and for more control over close.
     */
    children: MaybeRenderProp<{
        close: () => void;
    }>;
    /**
     * The ref of the element the Popover should visually attach itself to.
     */
    triggerRef?: RefObject<undefined>;
    scrollRef?: RefObject<HTMLElement>;
    /**
     * Whether the Popover is open (controlled mode).
     */
    isOpen?: boolean;
    /**
     * Wether to default the Popover to open (uncontrolled mode).
     */
    defaultOpen?: boolean;
    /**
     * Called when the Popover opens.
     */
    onOpen?: () => void;
    /**
     * Called when the Popover closes.
     */
    onClose?: () => void;
    /**
     * The placement of the Popover overlay with respect to its trigger element.
     */
    placement?: Placement;
    /**
     * Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient
     * room for it to render completely. Defaults to true.
     */
    shouldFlip?: boolean;
    /**
     * The additional offset applied along the main axis between the element and its anchor element.
     */
    offset?: number;
    /**
     * The additional offset applied along the cross axis between the element and its anchor element.
     */
    crossOffset?: number;
} & PopoverBoxProps;
export declare const Popover: React.ForwardRefExoticComponent<{
    /**
     * The element that will trigger the Popover. Should be a button in most cases. Can use a function for more control.
     */
    renderTrigger: MaybeRenderProp<{
        isOpen: boolean;
    }, ReactElement>;
    /**
     * The content to render in the Popover. Can use a function to access Popover state and for more control over close.
     */
    children: MaybeRenderProp<{
        close: () => void;
    }>;
    /**
     * The ref of the element the Popover should visually attach itself to.
     */
    triggerRef?: RefObject<undefined>;
    scrollRef?: RefObject<HTMLElement>;
    /**
     * Whether the Popover is open (controlled mode).
     */
    isOpen?: boolean;
    /**
     * Wether to default the Popover to open (uncontrolled mode).
     */
    defaultOpen?: boolean;
    /**
     * Called when the Popover opens.
     */
    onOpen?: () => void;
    /**
     * Called when the Popover closes.
     */
    onClose?: () => void;
    /**
     * The placement of the Popover overlay with respect to its trigger element.
     */
    placement?: Placement;
    /**
     * Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient
     * room for it to render completely. Defaults to true.
     */
    shouldFlip?: boolean;
    /**
     * The additional offset applied along the main axis between the element and its anchor element.
     */
    offset?: number;
    /**
     * The additional offset applied along the cross axis between the element and its anchor element.
     */
    crossOffset?: number;
} & PopoverBoxProps & React.RefAttributes<HTMLDivElement>>;
export {};
