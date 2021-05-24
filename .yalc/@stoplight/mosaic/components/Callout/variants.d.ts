import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IntentVals } from '../../enhancers';
import { BoxOwnProps } from '../Box/types';
export declare const iconVariants: {
    intent: Record<IntentVals, IconProp>;
};
export declare const variants: Record<'default' | 'outline', Record<IntentVals, Partial<BoxOwnProps>>>;
