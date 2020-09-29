import { IBranch, IProperty, IString } from './basics';
import { IContact } from './Contact';
import { ILicense } from './License';
import { IServer } from './Server';

type INameProperty = IProperty<IString<'name'>, IString>;

type IVersionProperty = IProperty<IString<'version'>, IString>;

type ITermsOfServiceProperty = IProperty<IString<'termsOfService'>, IString>;

type IServiceChildren = INameProperty | IVersionProperty | IServer | IContact | ILicense | ITermsOfServiceProperty;

export interface IService extends IBranch {
  type: 'service';
  children: IServiceChildren[];
  // security?: HttpSecurityScheme[];
  // securitySchemes?: HttpSecurityScheme[];
}
