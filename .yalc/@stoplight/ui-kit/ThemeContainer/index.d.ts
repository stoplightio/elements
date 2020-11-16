import * as React from 'react';
interface IThemeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    namespace?: string;
    dark?: boolean;
}
declare const ThemeContainer: React.FunctionComponent<IThemeContainerProps>;
export { ThemeContainer, IThemeContainerProps };
