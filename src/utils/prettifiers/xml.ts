import { stringifyXML } from '../stringifiers/xml';
import { prettifyHTML } from './html';
import { Prettifier } from './types';

export const prettifyXML: Prettifier<string | XMLDocument> = xml => prettifyHTML(stringifyXML(xml));
