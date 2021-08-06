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

describe('Model', () => {
  it('displays examples', async () => {
    const { container } = render(<Model data={exampleSchema} />);

    expect(screen.getByRole('heading', { name: /example/i })).toBeInTheDocument();
    expect(container).toHaveTextContent('"propA": "valueA"');
  });

  it('displays description at top of doc for objects', async () => {
    const { container } = render(<Model data={exampleSchema} />);

    expect(container).toHaveTextContent(/example schema description/i);
  });

  it('does not display description at top of doc for non-objects', async () => {
    const description = screen.queryByRole('textbox');

    expect(description).not.toBeInTheDocument();
  });
});
