import { IBranch } from './basics';
import { IEmail, IName, IUrl } from './leafs';

type IContactChildren = IName | IUrl | IEmail;

export interface IContact extends IBranch {
  type: 'contact';
  children: IContactChildren[];
}
