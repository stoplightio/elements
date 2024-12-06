import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { ElementsOptionsProvider } from '../../../context/Options';
import * as exampleGenerationUtils from '../../../utils/exampleGeneration/exampleGeneration';
import { chooseOption } from '../../../utils/tests/chooseOption';
import { renderExtensionRenderer } from '../story-renderer-helper';
import { Model } from './Model';

const generatedExample = '{\n"iamtoobig": "string",\n"name": "string",\n"id": "number",\n"email": "string", \n}';
const exampleSchema: JSONSchema7 = {
  type: 'object',
  description: 'example schema description',
  properties: {
    propA: {
      type: 'string',
      enum: ['valueA'],
      // @ts-ignore
      'x-enum-descriptions': {
        valueA: 'description of valueA',
      },
    },
  },
};

const model_data: JSONSchema7 = {
  title: 'operator_reference',
  description: 'description from allOf Operator',
  allOf: [
    {
      $ref: '#/%24defs/bird',
    },
    {
      $ref: '#/%24defs/animal',
    },
  ],

  $defs: {
    bird: {
      type: 'object',
      title: 'bird',
      description: 'this is bird model',
      properties: {
        id: {
          type: 'string',
        },
        bird_type: {
          type: 'string',
        },
      },
    },
    animal: {
      $ref: '#/%24defs/bird',
      title: 'animal',
      description: 'This is from Animal model',
    },
  },
};
const props = {
  nodeTitle: 'operator_reference',
  layoutOptions: {
    hideExport: false,
  },
  exportProps: {
    original: {
      href: 'https://stoplight-local.com:8443/api/v1/projects/venkat/stop-95/nodes/models/operator_reference.yaml?fromExportButton=true&snapshotType=model',
    },
    bundled: {
      href: 'https://api.stoplight-local.com:8443/projects/cHJqOjE2NA/branches/main/export/models/operator_reference.yaml',
    },
  },
};

describe('Model', () => {
  it('displays examples', async () => {
    const { container } = render(<Model data={exampleSchema} />);

    expect(screen.getByRole('heading', { name: /example/i })).toBeInTheDocument();
    expect(container).toHaveTextContent('"propA": "valueA"');
  });

  it('does not show examples with more lines than supported, by default', async () => {
    jest.spyOn(exampleGenerationUtils, 'exceedsSize').mockImplementation((example: string, size: number = 2) => {
      return example.split(/\r\n|\r|\n/).length > size;
    });
    jest
      .spyOn(exampleGenerationUtils, 'generateExamplesFromJsonSchema')
      .mockReturnValue([{ label: '', data: generatedExample }]);

    render(<Model data={exampleSchema} />);

    await screen.findByText('Large examples are not rendered by default.');
    jest.restoreAllMocks();
  });

  it('shows examples bigger than supported after clicking "Load Examples" button', async () => {
    jest.spyOn(exampleGenerationUtils, 'exceedsSize').mockImplementation((example: string, size: number = 2) => {
      return example.split(/\r\n|\r|\n/).length > size;
    });
    jest
      .spyOn(exampleGenerationUtils, 'generateExamplesFromJsonSchema')
      .mockReturnValue([{ label: '', data: generatedExample }]);

    render(<Model data={exampleSchema} />);

    const button = screen.getByRole('button', { name: 'load-example' });
    userEvent.click(button);

    expect(await screen.findByText('"iamtoobig"')).toBeInTheDocument();
    jest.restoreAllMocks();
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

  describe('export button', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <MosaicProvider>
          <Model
            data={exampleSchema}
            exportProps={{ original: { onPress: jest.fn() }, bundled: { onPress: jest.fn() } }}
          />
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

  describe('Vendor Extensions', () => {
    it('should call rendorExtensionAddon', async () => {
      const vendorExtensionRenderer = jest.fn();
      const { unmount } = render(
        <ElementsOptionsProvider renderExtensionAddon={vendorExtensionRenderer}>
          <Model data={exampleSchema} />
        </ElementsOptionsProvider>,
      );

      expect(vendorExtensionRenderer).toHaveBeenLastCalledWith(
        expect.objectContaining({
          nestingLevel: 1,
          vendorExtensions: {
            'x-enum-descriptions': expect.objectContaining({ valueA: 'description of valueA' }),
          },
        }),
      );

      unmount();
    });

    it('should display vendor extensions', async () => {
      const vendorExtensionRenderer = jest.fn().mockImplementation(props => {
        return renderExtensionRenderer(props);
      });

      const { unmount } = render(
        <ElementsOptionsProvider renderExtensionAddon={vendorExtensionRenderer}>
          <Model
            data={exampleSchema}
            layoutOptions={{
              hideTryItPanel: true,
              hideSecurityInfo: true,
              hideServerInfo: true,
              hideExport: true,
              hideTryIt: true,
            }}
          />
        </ElementsOptionsProvider>,
      );

      expect(screen.queryByRole('columnheader', { name: /Enum value/i })).toBeInTheDocument();
      expect(screen.queryByRole('columnheader', { name: /Description/i })).toBeInTheDocument();

      expect(screen.queryByText('description of valueA')).toBeInTheDocument();

      unmount();
    });
    it('CombineSchema must have description', () => {
      render(<Model data={model_data} {...props} />);
      const description = screen.queryByRole('textbox');

      expect(description).toBeInTheDocument();
    });
  });
});
