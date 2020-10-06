import { ILeaf } from './basics';

export interface IPropertySummary extends ILeaf {
  type: 'propertySummary';
  value: string;
}
