import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { chooseOption } from '../../../utils/tests/chooseOption';
import { Model } from './Model';

const exampleSchema: JSONSchema7 = {
  type: 'object',
  description: 'example schema description',
  properties: {
    propA: {
      type: 'string',
      enum: ['valueA'],
    },
  },
};

const exampleStringSchema: JSONSchema7 = {
  type: 'string',
  description: 'example schema description that should only show once :)',
};

describe('Model', () => {
  it('displays examples', async () => {
    const { container } = render(<Model data={exampleSchema} />);

    expect(screen.getByRole('heading', { name: /example/i })).toBeInTheDocument();
    expect(container).toHaveTextContent('"propA": "valueA"');
  });

  it('uses examples defined in the schema', async () => {
    const examples = {
      ...exampleSchema,
      examples: [
        {
          propA: 'first',
        },
        {
          propA: 'second',
        },
      ],
    };
    const { container } = render(
      <MosaicProvider>
        <Model data={examples} />
      </MosaicProvider>,
    );

    const menuTrigger = screen.getByLabelText('Example');
    expect(menuTrigger).toHaveTextContent('Example: default');
    expect(container).toHaveTextContent('"propA": "first"');

    chooseOption(menuTrigger, 'example-1');
    expect(container).toHaveTextContent('"propA": "second"');
  });

  it('uses x-examples defined in the schema', async () => {
    const examples = {
      ...exampleSchema,
      'x-examples': {
        firstTitle: {
          value: {
            propA: 'first',
          },
        },
        secondTitle: {
          value: {
            propA: 'second',
          },
        },
      },
    };
    const { container } = render(
      <MosaicProvider>
        <Model data={examples} />
      </MosaicProvider>,
    );

    const menuTrigger = screen.getByLabelText('Example');
    expect(menuTrigger).toHaveTextContent('Example: firstTitle');
    expect(container).toHaveTextContent('"propA": "first"');

    chooseOption(menuTrigger, 'secondTitle');
    expect(container).toHaveTextContent('"propA": "second"');
  });

  it('displays description at top of doc for objects', async () => {
    render(<Model data={exampleSchema} />);
    const description = screen.queryAllByText('example schema description');
    const textboxDescription = screen.getByRole('textbox');

    expect(description).toHaveLength(1);
    expect(textboxDescription).toHaveTextContent('example schema description');
  });

  it('does not display description at top of doc for non-objects', async () => {
    render(<Model data={exampleStringSchema} />);
    const description = screen.queryByRole('textbox');

    expect(description).not.toBeInTheDocument();
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
