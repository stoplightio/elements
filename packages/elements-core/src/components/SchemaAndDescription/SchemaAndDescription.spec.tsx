import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { SchemaAndDescription } from '.';

describe('SchemaAndDescription', () => {
  it('should handle title and description merging', () => {
    const schema: JSONSchema7 = {
      allOf: [
        {
          title: 'Stoplight',
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
          },
        },
        {
          type: 'object',
          properties: {
            version: {
              type: 'integer',
            },
          },
        },
      ],
    };

    render(<SchemaAndDescription schema={schema} />);

    expect(screen.queryByText('allOf')).not.toBeInTheDocument();
  });
});
