import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import { BinaryBody, BinaryBodyProps } from '../BinaryBody';

describe('BinaryBody', () => {
  it('renders filr input when the form is application/octet-stream', () => {
    // Arrange
    const props: BinaryBodyProps = {
      specification: {
        id: '493afac014fa8',
        mediaType: 'application/octet-stream',
        encodings: [],
        schema: {
          type: 'string',
          format: 'binary',
          $schema: 'http://json-schema.org/draft-07/schema#',
        },
      },
      values: {},
      onChangeValues: () => {},
    };

    // Act
    const { getByLabelText } = render(<BinaryBody {...props} />);

    // Assert
    expect(getByLabelText('file')).toBeInTheDocument();
  });
});
