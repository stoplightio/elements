/// <reference types="urijs" />
import * as Types from '../types';
export declare class FileReader implements Types.IResolver {
    resolve(uri: uri.URI): Promise<unknown>;
}
export declare class HttpReader implements Types.IResolver {
    resolve(uri: uri.URI): Promise<any>;
}
