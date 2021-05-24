import { EnhancerFn } from './types';
export declare type FlexVals = 1 | 'auto' | 'initial' | 'none';
export declare type FlexDirectionVals = 'row' | 'row-reverse' | 'col' | 'col-reverse';
export declare type FlexWrapVals = true | 'reverse' | 'no-wrap';
export declare type FlexGrowVals = true | 0;
export declare type FlexShrinkVals = true | 0;
export declare type JustifyContentVals = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export declare type JustifyItemsVals = 'auto' | 'start' | 'end' | 'center' | 'stretch';
export declare type JustifySelfVals = 'auto' | 'start' | 'end' | 'center' | 'stretch';
export declare type AlignContentVals = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export declare type AlignItemsVals = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export declare type AlignSelfVals = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
export interface IFlexProps {
    flex?: FlexVals;
    flexDirection?: FlexDirectionVals;
    flexWrap?: FlexWrapVals;
    flexGrow?: FlexGrowVals;
    flexShrink?: FlexShrinkVals;
    justifyContent?: JustifyContentVals;
    justifyItems?: JustifyItemsVals;
    justifySelf?: JustifySelfVals;
    alignContent?: AlignContentVals;
    alignItems?: AlignItemsVals;
    alignSelf?: AlignSelfVals;
}
export interface IFlexShorthandProps {
    align?: IFlexProps['alignItems'];
    justify?: IFlexProps['justifyContent'];
    wrap?: IFlexProps['flexWrap'];
    direction?: IFlexProps['flexDirection'];
    grow?: IFlexProps['flexGrow'];
    shrink?: IFlexProps['flexShrink'];
}
export declare const flexPropNames: Array<keyof IFlexProps>;
export declare const flexProps: EnhancerFn<IFlexProps>;
