import { IBranch } from './basics';
import { IAllowEmptyValue, IAllowReserved, IDeprecated, IDescription, IExplode, IName, IRequired } from './leafs';
import { IStyle, IStyle_Cookie, IStyle_Header, IStyle_Path, IStyle_Query } from './leafs/Style';
import { ISchema } from './Schema';

type IParamChildren =
  | IName
  | IStyle
  | IDescription
  | IExplode
  | IRequired
  | IDeprecated
  | ISchema
  | IAllowEmptyValue
  | IAllowReserved;
//| IExample
//| IEncoding;

// Just thinking about whether we can make primitive properties non-children.
enum EnumParamProps {
  name = 0,
  style,
  description,
  explode,
  required,
  deprecated,
  allowEmptyValue,
  allowReserved,
  schema,
  example,
  encoding,
}

export interface IParam extends IBranch {
  type: 'param';
  children: IParamChildren[];
}

type IParamChildren_Query =
  | IName
  | IStyle_Query
  | IDescription
  | IExplode
  | IRequired
  | IDeprecated
  | ISchema
  | IAllowEmptyValue
  | IAllowReserved;
//| IExample
//| IEncoding;

export interface IParam_Query extends IParam {
  type: 'param';
  children: IParamChildren_Query[];
}

type IParamChildren_Path = IName | IStyle_Path | IDescription | IExplode | IRequired | IDeprecated | ISchema;

export interface IParam_Path extends IParam {
  type: 'param';
  children: IParamChildren_Path[];
}

type IParamChildren_Header = IName | IStyle_Header | IDescription | IExplode | IRequired | IDeprecated | ISchema;
//| IExample
//| IEncoding;

export interface IParam_Header extends IParam {
  type: 'param';
  children: IParamChildren_Header[];
}

type IParamChildren_Cookie = IName | IStyle_Cookie | IDescription | IExplode | IRequired | IDeprecated | ISchema;
//| IExample
//| IEncoding;

export interface IParam_Cookie extends IParam {
  type: 'param';
  children: IParamChildren_Cookie[];
}
