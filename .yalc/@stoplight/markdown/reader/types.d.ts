import * as Unist from 'unist';
export interface ILangReader {
    fromLang(raw: string): Unist.Parent;
    toLang(data: Unist.Parent): string;
}
