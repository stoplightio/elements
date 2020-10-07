import { IBranch } from './basics';
import { IContact } from './Contact';
import { IName, IVersion } from './leafs';
import { ILicense } from './License';
import { IServer } from './Server';
import { ITermsOfService } from './TermsOfService';

type IServiceChildren = IName | IVersion | IServer | IContact | ILicense | ITermsOfService;

export interface IService extends IBranch {
  type: 'service';
  children: IServiceChildren[];
  // security?: HttpSecurityScheme[];
  // securitySchemes?: HttpSecurityScheme[];
}
