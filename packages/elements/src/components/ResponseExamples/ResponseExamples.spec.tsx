import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { httpOperation } from '../../__fixtures__/operations/operation-with-examples';
import { ResponseExamples } from './ResponseExamples';

describe('Response Examples', () => {
  it('displays first provided example by default', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} chosenMediaType="application/json" chosenStatusCode="200" />,
    );

    expect(container).toHaveTextContent('some');
    expect(container).toHaveTextContent('example');
  });

  it('allows to choose second example with select', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} chosenMediaType="application/json" chosenStatusCode="200" />,
    );

    userEvent.selectOptions(screen.getByRole('combobox'), 'Second Example');

    expect(container).toHaveTextContent('another');
    expect(container).toHaveTextContent('example');
  });

  it('generates example based on schema if necessary', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} chosenMediaType="application/json" chosenStatusCode="201" />,
    );

    expect(container).toHaveTextContent('someParameter');
    expect(container).toHaveTextContent('string');
  });

  it('does not show component if there are no examples and no schemas', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} chosenMediaType="application/json" chosenStatusCode="404" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('does not show select (but shows name) if there is only one example present', () => {
    const { container } = render(
      <ResponseExamples httpOperation={httpOperation} chosenMediaType="application/json" chosenStatusCode="202" />,
    );

    const select = screen.queryByRole('combobox');

    expect(select).not.toBeInTheDocument();
    expect(container).toHaveTextContent('Only one example');
  });
});
