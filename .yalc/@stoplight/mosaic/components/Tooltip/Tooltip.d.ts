import { MutableRefObject, ReactElement } from 'react';
import { MaybeRenderProp, Placement } from '../../utils';
/**
 * Expose a select set of props to customize the popover wrapper
 */
declare type TooltipBoxProps = {};
export declare type TooltipProps = {
    /**
     * The element that will trigger the Tooltip. Should be a button in most cases. Can use a function for more control.
     */
    renderTrigger: MaybeRenderProp<{
        isOpen: boolean;
    }, ReactElement>;
    /**
     * The content to render in the Tooltip. Can use a function to access Tooltip state and for more control over close.
     */
    children: MaybeRenderProp<{
        close: () => void;
    }>;
    /**
     * The ref of the element the Tooltip should visually attach itself to.
     */
    triggerRef?: MutableRefObject<undefined>;
    /**
     * The delay time for the tooltip to show up, in milliseconds. Defaults to 500.
     */
    delay?: number;
    /**
     * Whether the tooltip should be disabled, independent from the trigger.
     */
    isDisabled?: boolean;
    /**
     * Whether the Tooltip is open (controlled mode).
     */
    isOpen?: boolean;
    /**
     * Wether to default the Tooltip to open (uncontrolled mode).
     */
    defaultOpen?: boolean;
    /**
     * Called when the Tooltip opens.
     */
    onOpen?: () => void;
    /**
     * Called when the Tooltip closes.
     */
    onClose?: () => void;
    /**
     * The placement of the Tooltip overlay with respect to its trigger element. Defaults to `bottom`.
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
    /**
     * Pass true to render the tooltip without an arrow.
     */
    hideArrow?: boolean;
} & TooltipBoxProps;
export declare const Tooltip: (props: TooltipProps) => JSX.Element;
export {};
