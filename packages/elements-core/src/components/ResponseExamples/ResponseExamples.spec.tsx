import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { httpOperation as bigExampleOperation } from '../../__fixtures__/operations/big-response';
import { httpOperation } from '../../__fixtures__/operations/operation-with-examples';
import { withMosaicProvider } from '../../hoc/withMosaicProvider';
import { chooseOption } from '../../utils/tests/chooseOption';
import { ResponseExamples as RawResponseExamples } from './ResponseExamples';

const ResponseExamples = withMosaicProvider(RawResponseExamples);

describe('Response Examples', () => {
  it('displays first provided example by default', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/json" responseStatusCode="200" />,
    );

    expect(container).toHaveTextContent('some');
    expect(container).toHaveTextContent('example');
  });

  it('allows to choose second example with select', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} responseMediaType="application/json" responseStatusCode="200" />,
    );

    chooseOption(screen.getByText('Response Example: First Example'), 'Second Example');

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
    render(
      <ResponseExamples
        httpOperation={bigExampleOperation}
        responseMediaType="application/json"
        responseStatusCode="200"
      />,
    );

    screen.getByText('Large examples are not rendered by default.');
  });

  it('shows examples >500 lines after clicking "Load Examples" button', async () => {
    render(
      <ResponseExamples
        httpOperation={bigExampleOperation}
        responseMediaType="application/json"
        responseStatusCode="200"
      />,
    );

    const button = screen.getByRole('button', { name: 'load-example' });
    userEvent.click(button);

    expect(await screen.findByText('"iamthefirstprop"')).toBeInTheDocument();
  });
});
