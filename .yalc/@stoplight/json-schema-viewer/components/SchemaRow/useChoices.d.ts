import { SchemaNode } from '@stoplight/json-schema-tree';
import * as React from 'react';
declare type Choice = {
    title: string;
    type: SchemaNode;
};
export declare const useChoices: (schemaNode: SchemaNode) => {
    selectedChoice: Choice;
    setSelectedChoice: React.Dispatch<React.SetStateAction<Choice | undefined>>;
    choices: Choice[];
};
export {};
