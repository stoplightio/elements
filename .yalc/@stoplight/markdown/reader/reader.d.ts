import { MDAST } from '../ast-types';
import { ILangReader } from './types';
export declare class Reader implements ILangReader {
    fromLang(raw: string): MDAST.Root;
    toLang(data: MDAST.Root): string;
}
