import { BoxOwnProps, IntentVals } from '@stoplight/mosaic';
import { Language } from 'prism-react-renderer';
import React from 'react';
interface ICodeEditorProps extends BoxOwnProps {
    value: string;
    onChange(code: string): void;
    padding?: number;
    language?: Language;
    autoFocus?: boolean;
    showLineNumbers?: boolean;
    style?: React.CSSProperties;
    placeholder?: string;
    intent?: IntentVals;
}
export declare const CodeEditor: ({ value, language, className, style, placeholder, autoFocus, showLineNumbers, onChange, padding, intent, ...props }: ICodeEditorProps) => JSX.Element;
export {};
