import { Provider as MosaicProvider, useMosaicContext } from '@stoplight/mosaic';
import { render } from '@testing-library/react';
import React from 'react';

import { withMosaicProvider } from './withMosaicProvider';

describe('withMosaicProvider()', () => {
  it('should re-use mosaic context if already present in tree, rather than creating a new provider', () => {
    let mosaicContextFromParent: ReturnType<typeof useMosaicContext> | undefined;
    let mosaicContextFromProvider: ReturnType<typeof useMosaicContext> | undefined;

    const Page = withMosaicProvider(() => {
      mosaicContextFromProvider = useMosaicContext();
      return null;
    });

    const Parent = () => {
      mosaicContextFromParent = useMosaicContext();

      return <Page />;
    };

    render(
      <MosaicProvider>
        <Parent />
      </MosaicProvider>,
    );

    expect(mosaicContextFromProvider).toBe(mosaicContextFromParent);
  });

  it('should create new mosaic context if not already present in tree', () => {
    let mosaicContextFromProvider: ReturnType<typeof useMosaicContext> | undefined;

    const Page = withMosaicProvider(() => {
      mosaicContextFromProvider = useMosaicContext();
      return null;
    });

    const Parent = () => {
      return <Page />;
    };

    render(<Parent />);

    expect(mosaicContextFromProvider).toHaveProperty('providerId');
  });
});
