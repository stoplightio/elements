import { ILeaf } from '../basics';

export interface IStyle extends ILeaf {
  type: 'style';
  value: 'simple' | 'form' | 'matrix' | 'label' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
}

export interface IStyle_Query extends IStyle {
  type: 'style';
  value: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
}

export interface IStyle_Path extends IStyle {
  type: 'style';
  value: 'simple' | 'matrix' | 'label';
}

export interface IStyle_Cookie extends IStyle {
  type: 'style';
  value: 'form';
}

export interface IStyle_Header extends IStyle {
  type: 'style';
  value: 'simple';
}
