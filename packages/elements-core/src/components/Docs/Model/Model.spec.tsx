import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { Model } from './Model';

const exampleSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    propA: {
      type: 'string',
      enum: ['valueA'],
    },
  },
};

describe('Model', () => {
  it('displays examples', async () => {
    const { container } = render(<Model data={exampleSchema} />);

    expect(screen.getByRole('heading', { name: /example/i })).toBeInTheDocument();
    expect(container).toHaveTextContent('"propA": "valueA"');
  });

  describe('export button', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <MosaicProvider>
          <Model
            data={exampleSchema}
            exportProps={{ original: { onPress: jest.fn() }, bundled: { onPress: jest.fn() } }}
          />
          ,
        </MosaicProvider>,
      );

      const exportButton = wrapper.getByRole('button', { name: 'Export' });
      expect(exportButton).toBeInTheDocument();

      userEvent.click(exportButton);
      expect(wrapper.getByRole('menuitem', { name: 'Original' })).toBeInTheDocument();
      expect(wrapper.getByRole('menuitem', { name: 'Bundled References' })).toBeInTheDocument();
    });

    it('should not render if hideExport is true', () => {
      const wrapper = render(
        <MosaicProvider>
          <Model
            data={exampleSchema}
            exportProps={{ original: { onPress: jest.fn() }, bundled: { onPress: jest.fn() } }}
            layoutOptions={{ hideExport: true }}
          />
        </MosaicProvider>,
      );

      const exportButton = wrapper.queryByRole('button', { name: 'Export' });
      expect(exportButton).not.toBeInTheDocument();
    });

    it('should not render if no exportProps are present', () => {
      const wrapper = render(
        <MosaicProvider>
          <Model data={exampleSchema} />
        </MosaicProvider>,
      );

      const exportButton = wrapper.queryByRole('button', { name: 'Export' });
      expect(exportButton).not.toBeInTheDocument();
    });
  });
});
