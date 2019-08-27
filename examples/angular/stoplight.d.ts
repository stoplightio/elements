declare namespace SL {
  const createElement: any;
  const config: any;
  const elements: {
    page: {
      htmlId: string;
      srn: string;
      render(htmlId: string, srn: string): void;
      remove(): void;
    };
    toc: {
      htmlId: string;
      srn: string;
      render(htmlId: string, srn: string): void;
      remove(): void;
    };
  };
}
