import * as React from 'react';
interface ICodeViewerProps extends React.HTMLAttributes<HTMLElement> {
    value: string;
    language?: string;
    showLineNumbers?: boolean;
    inline?: boolean;
}
declare const CodeViewer: React.FunctionComponent<ICodeViewerProps>;
export { CodeViewer, ICodeViewerProps };
