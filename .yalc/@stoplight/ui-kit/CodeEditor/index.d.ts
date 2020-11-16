import { Intent } from '@blueprintjs/core';
import * as React from 'react';
import ReactSimpleCodeEditor from 'react-simple-code-editor';
interface ICodeEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value: string;
    onChange(code: string): any;
    padding?: number | string;
    language?: string;
    autoFocus?: boolean;
    showLineNumbers?: boolean;
    intent?: Intent;
}
declare const CodeEditor: React.ForwardRefExoticComponent<ICodeEditorProps & React.RefAttributes<ReactSimpleCodeEditor>>;
export { CodeEditor, ICodeEditorProps };
