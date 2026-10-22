import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { httpOperation as bigExampleOperation } from '../../__fixtures__/operations/big-response';
import { httpOperation } from '../../__fixtures__/operations/operation-with-examples';
import { withMosaicProvider } from '../../hoc/withMosaicProvider';
import * as exampleGenerationUtils from '../../utils/exampleGeneration/exampleGeneration';
import { chooseOption } from '../../utils/tests/chooseOption';
import { ResponseExamples as RawResponseExamples } from './ResponseExamples';

const ResponseExamples = withMosaicProvider(RawResponseExamples);

const generatedExample = '{\n"iamtoobig": "string",\n"name": "string",\n"id": "number",\n"email": "string", \n}';

describe('Response Examples', () => {
  it('displays first provided example by default', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/json" responseStatusCode="200" />,
    );

    expect(container).toHaveTextContent('some');
    expect(container).toHaveTextContent('example');
  });

  it('allows to choose second example with select', async () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/json" responseStatusCode="200" />,
    );

    await chooseOption(screen.getByText('Response Example: First Example'), 'Second Example');

    expect(container).toHaveTextContent('another');
    expect(container).toHaveTextContent('example');
  });

  it('generates example based on schema if necessary', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/json" responseStatusCode="201" />,
    );

    expect(container).toHaveTextContent('someParameter');
    expect(container).toHaveTextContent('string');
  });

  it('does not generate examples for media types other than application/json', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/xml" responseStatusCode="203" />,
    );

    expect(container.children[0].children[0]).toBeEmptyDOMElement();
  });

  it('does not show component if there are no examples and no schemas', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/json" responseStatusCode="404" />,
    );

    expect(container.children[0].children[0]).toBeEmptyDOMElement();
  });

  it('does not show select if there is only one example present', () => {
    render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/json" responseStatusCode="202" />,
    );

    const select = screen.queryByRole('combobox');

    expect(select).not.toBeInTheDocument();
  });

  it('does not show write only parameters in the response example', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/json" responseStatusCode="204" />,
    );

    expect(container).not.toHaveTextContent('writeOnlyParamter');
    expect(container).toHaveTextContent('someOtherParameter');
  });

  it('does not show examples >500 lines by default', async () => {
    vi.spyOn(exampleGenerationUtils, 'exceedsSize').mockImplementation((example: string, size: number = 2) => {
      return example.split(/\r\n|\r|\n/).length > size;
    });
    vi.spyOn(exampleGenerationUtils, 'generateExampleFromMediaTypeContent').mockReturnValue(generatedExample);

    render(
      <ResponseExamples
        httpOperation={bigExampleOperation}
        responseMediaType="application/json"
        responseStatusCode="200"
      />,
    );

    screen.getByText('Large examples are not rendered by default.');
    vi.restoreAllMocks();
  });

  it('shows examples >500 lines after clicking "Load Examples" button', async () => {
    vi.spyOn(exampleGenerationUtils, 'exceedsSize').mockImplementation((example: string, size: number = 2) => {
      return example.split(/\r\n|\r|\n/).length > size;
    });
    vi.spyOn(exampleGenerationUtils, 'generateExampleFromMediaTypeContent').mockReturnValue(generatedExample);

    render(
      <ResponseExamples
        httpOperation={bigExampleOperation}
        responseMediaType="application/json"
        responseStatusCode="200"
      />,
    );

    const button = screen.getByRole('button', { name: 'load-example' });
    await userEvent.click(button);

    await waitFor(() => expect(screen.queryByRole('button', { name: 'load-example' })).not.toBeInTheDocument());
    expect(screen.queryByText('Large examples are not rendered by default.')).not.toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
