import { AriaButtonProps } from '@react-types/button';
import { AriaLabelingProps } from '@react-types/shared';
import { Key, ReactElement, ReactNode } from 'react';
import { FlexGrowVals, FlexVals, WidthVals } from '../../enhancers';
import { FieldButtonProps } from '../Button';
export declare type SelectProps = AriaLabelingProps & {
    /**
     * Items in the select.
     */
    options: Iterable<SelectItemProps> | Iterable<SelectSectionProps>;
    /**
     * The name of the Select input, used when submitting an HTML form.
     */
    name?: string;
    /**
     * Temporary text that occupies the text input when it is empty.
     */
    placeholder?: string;
    /**
     * The select button size - defaults to 'md'.
     */
    size?: 'sm' | 'md';
    /**
     * A function that returns the element that will trigger the Select. Should be a FieldButton in most cases.
     */
    renderTrigger?: (props: Pick<FieldButtonProps, 'placeholder' | 'onClear'> & AriaButtonProps<'button'>, state: {
        selectedItem?: SelectOptionProps;
    }) => ReactElement;
    /**
     * Optional text to render in front of the trigger text. Is only included when a value is selected - placeholder is not affected.
     */
    triggerTextPrefix?: string;
    /**
     * When true a `x` icon will display in the trigger that the user can click to clear the Select value. Not applicable when custom renderTrigger is in use.
     */
    isClearable?: boolean;
    /**
     * Whether the Select is disabled.
     */
    isDisabled?: boolean;
    /**
     * The currently selected value in the collection (controlled).
     */
    value?: Key;
    /**
     * The initial selected value in the collection (uncontrolled).
     */
    defaultValue?: Key;
    /**
     * Handler that is called when the selection changes.
     */
    onChange?: (value: Key) => void;
    /**
     * Called when the Select opens.
     */
    onOpen?: () => void;
    /**
     * Called when the Select closes.
     */
    onClose?: () => void;
    flex?: FlexVals;
    flexGrow?: FlexGrowVals;
    w?: WidthVals;
};
export declare type SelectItemProps = SelectOptionProps | SelectActionProps;
declare type SelectItemBase = {
    /**
     * Wether the item can be interacted with or selected.
     */
    isDisabled?: boolean;
    /**
     * Optional element to render on the right side of the menu item. Use this to display keyboard shortcut, badge counts, etc.
     */
    meta?: ReactNode;
};
export declare type SelectOptionProps = SelectItemBase & {
    value: Key;
    label?: string;
};
export declare type SelectActionProps = SelectItemBase & {
    label: string;
    /**
     * Called when SelectOption is clicked (or triggered in any way, such as via keyboard shortcut).
     */
    onPress: () => void;
};
export declare type SelectSectionProps = {
    /** Item objects in the section. */
    options: Iterable<SelectItemProps>;
    title?: string;
    /** An accessibility label for the section. */
    'aria-label'?: string;
};
export {};
