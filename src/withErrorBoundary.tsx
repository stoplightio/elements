import * as React from 'react';

const FallbackComponent: FallbackComponent = ({ error }) => {
  return (
    <div className="p-4">
      <b>Error</b>
      {error && `: ${error.message}`}
    </div>
  );
};

export type FallbackComponent = React.ComponentType<{ error: Error | null }>;
export type ErrorBoundaryProps = { FallbackComponent?: FallbackComponent };

// react-error-boundary does not support recovering, see  https://github.com/bvaughn/react-error-boundary/pull/16/files
export function withErrorBoundary<T extends { value: unknown } & ErrorBoundaryProps>(
  WrappedComponent: React.ComponentType<Omit<T, 'FallbackComponent'>>,
  displayName?: string,
) {
  return class ErrorBoundary extends React.PureComponent<T, { error: Error | null }> {
    public state = {
      error: null,
    };

    public static displayName = displayName;

    public componentDidUpdate(prevProps: Readonly<T>) {
      if (this.state.error !== null && prevProps.value !== this.props.value) {
        this.setState({ error: null });
      }
    }

    // there is no error hook yet, see https://reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks
    public static getDerivedStateFromError(error: Error) {
      return { error };
    }

    public render() {
      const { FallbackComponent: Fallback = FallbackComponent, ...props } = this.props;
      if (this.state.error) {
        return <Fallback error={this.state.error} />;
      }

      return <WrappedComponent {...props} />;
    }
  };
}
