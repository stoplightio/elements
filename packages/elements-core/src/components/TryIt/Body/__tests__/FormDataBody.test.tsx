import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import { FormDataBody, FormDataBodyProps } from '../FormDataBody';

describe('FormDataBody', () => {
  it('when the top level of the schema is oneOf', () => {
    // Arrange
    const props: FormDataBodyProps = {
      specification: {
        id: '493afac014fa8',
        mediaType: 'application/x-www-form-urlencoded',
        encodings: [],
        schema: {
          oneOf: [
            {
              title: 'Authenticate',
              description: 'supply username and password for refresh and access tokens',
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
            {
              title: 'Access Token Refresh',
              description: 'supply a refresh token for new refresh and access tokens',
              type: 'object',
              properties: {
                refresh_token: {
                  type: 'string',
                },
              },
            },
          ],
          description: '',
          title: 'Request Body Schemas',
          $schema: 'http://json-schema.org/draft-07/schema#',
        },
      },
      values: {},
      isAllowedEmptyValues: {},
      onChangeParameterAllow: () => {},
      onChangeValues: () => {},
    };

    // Act
    const { getByTestId } = render(<FormDataBody {...props} />);

    // Assert
    expect(getByTestId('oneof-menu')).toBeVisible();
  });

  it('when the top level of the schema has properties', () => {
    // Arrange
    const props: FormDataBodyProps = {
      specification: {
        id: '493afac014fa8',
        mediaType: 'application/x-www-form-urlencoded',
        encodings: [],
        schema: {
          title: 'Authenticate',
          description: 'supply username and password for refresh and access tokens',
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
          $schema: 'http://json-schema.org/draft-07/schema#',
        },
      },
      values: {},
      isAllowedEmptyValues: {},
      onChangeParameterAllow: () => {},
      onChangeValues: () => {},
    };

    // Act
    const { queryByTestId } = render(<FormDataBody {...props} />);

    // Assert
    expect(queryByTestId('oneof-menu')).toBe(null);
  });
});
