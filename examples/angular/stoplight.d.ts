declare namespace SL {
  interface IWidget {
    srn: string;
    render(htmlId: string, srn: string): void;
    remove(): void;
  }

  // React.createElement
  const createElement: any;

  const config: {
    host?: string;
    token?: string;
    components?: any;
  };

  const elements: {
    hub: IWidget;
    page: IWidget;
    toc: IWidget;
  };
}
