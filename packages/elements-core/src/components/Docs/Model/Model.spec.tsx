import { render, screen } from '@testing-library/react';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

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
});
