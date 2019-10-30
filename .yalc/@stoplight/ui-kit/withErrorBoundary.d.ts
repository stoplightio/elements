import * as React from 'react';
export declare type FallbackComponent = React.ComponentType<{
    error: Error | null;
}>;
export interface IErrorBoundary {
    FallbackComponent?: FallbackComponent;
}
export declare function withErrorBoundary<T extends IErrorBoundary>(WrappedComponent: React.ComponentType<Omit<T, 'FallbackComponent'>>, props?: Array<keyof T>, displayName?: string): {
    new (props: Readonly<T>): {
        state: {
            error: null;
        };
        componentDidUpdate(prevProps: Readonly<T>): void;
        render(): JSX.Element;
        context: any;
        setState<K extends "error">(state: {
            error: Error | null;
        } | ((prevState: Readonly<{
            error: Error | null;
        }>, props: Readonly<T>) => {
            error: Error | null;
        } | Pick<{
            error: Error | null;
        }, K> | null) | Pick<{
            error: Error | null;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<T> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: T, context?: any): {
        state: {
            error: null;
        };
        componentDidUpdate(prevProps: Readonly<T>): void;
        render(): JSX.Element;
        context: any;
        setState<K extends "error">(state: {
            error: Error | null;
        } | ((prevState: Readonly<{
            error: Error | null;
        }>, props: Readonly<T>) => {
            error: Error | null;
        } | Pick<{
            error: Error | null;
        }, K> | null) | Pick<{
            error: Error | null;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<T> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    displayName: string | undefined;
    getDerivedStateFromError(error: Error): {
        error: Error;
    };
    contextType?: React.Context<any> | undefined;
};
