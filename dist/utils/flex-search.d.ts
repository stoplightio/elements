import { ServiceChildNode } from "./oas/types";
import { NodeSearchResult } from "../types";
export declare const getDocument: (name: string) => any;
export declare const indexDocument: (name: string, node: ServiceChildNode) => void;
export declare const searchDocument: (name: string, term: string) => NodeSearchResult[];
