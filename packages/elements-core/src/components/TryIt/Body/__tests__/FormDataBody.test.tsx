import '@testing-library/jest-dom';

import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { FormDataBody, FormDataBodyProps, MAX_LENGTH, OneOfMenu, OneOfMenuProps } from '../FormDataBody';

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
          // 'x-stoplight': {
          //   id: 'fy4lgsesqt84g',
          // },
          // 'x-internal': false,
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
          // 'x-stoplight': {
          //   id: 'fy4lgsesqt84g',
          // },
          // 'x-internal': false,
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

describe('OneOfMenu', () => {
  it('when sub-schemas have titles', async () => {
    // Arrange
    const title0 = 'Authenticate';
    const title1 = 'Access Token Refresh';
    const props: OneOfMenuProps = {
      subSchemas: [
        {
          title: title0,
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
          title: title1,
          description: 'supply a refresh token for new refresh and access tokens',
          type: 'object',
          properties: {
            refresh_token: {
              type: 'string',
            },
          },
        },
      ],
      onChange: jest.fn(),
    };
    const { getByTestId, getAllByRole } = render(
      <MosaicProvider>
        <OneOfMenu {...props} />
      </MosaicProvider>,
    );
    const dropDownMenu = getByTestId('oneof-menu');

    // Act
    userEvent.click(dropDownMenu);

    // Assert
    const menuItems = getAllByRole('menuitem');
    expect(menuItems[0]).toHaveTextContent(title0);
    expect(menuItems[1]).toHaveTextContent(title1);
  });

  it('when sub-schemas have descriptions', () => {
    // Arrange
    const description0 = 'Authenticate';
    const description1 = 'Access Token Refresh';
    const props: OneOfMenuProps = {
      subSchemas: [
        {
          description: description0,
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
          description: description1,
          type: 'object',
          properties: {
            refresh_token: {
              type: 'string',
            },
          },
        },
      ],
      onChange: jest.fn(),
    };
    const { getByTestId, getAllByRole } = render(
      <MosaicProvider>
        <OneOfMenu {...props} />
      </MosaicProvider>,
    );
    const dropDownMenu = getByTestId('oneof-menu');

    // Act
    userEvent.click(dropDownMenu);

    // Assert
    const menuItems = getAllByRole('menuitem');
    expect(menuItems[0]).toHaveTextContent(description0);
    expect(menuItems[1]).toHaveTextContent(description1);
  });

  it('when sub-schemas lack titles and descriptions', () => {
    // Arrange
    const props: OneOfMenuProps = {
      subSchemas: [
        {
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
          type: 'object',
          properties: {
            refresh_token: {
              type: 'string',
            },
          },
        },
      ],
      onChange: jest.fn(),
    };
    const { getByTestId, getAllByRole } = render(
      <MosaicProvider>
        <OneOfMenu {...props} />
      </MosaicProvider>,
    );
    const dropDownMenu = getByTestId('oneof-menu');

    // Act
    userEvent.click(dropDownMenu);

    // Assert
    const menuItems = getAllByRole('menuitem');
    expect(menuItems[0]).toHaveTextContent('0 - 2 properties');
    expect(menuItems[1]).toHaveTextContent('1 - 1 properties');
  });

  it('when labels would be very long', async () => {
    // Arrange
    const title0 = '0123456789'.repeat(10);
    const title1 = 'a nice short title';
    const props: OneOfMenuProps = {
      subSchemas: [
        {
          title: title0,
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
          title: title1,
          type: 'object',
          properties: {
            refresh_token: {
              type: 'string',
            },
          },
        },
      ],
      onChange: jest.fn(),
    };
    const { getByTestId, getAllByRole } = render(
      <MosaicProvider>
        <OneOfMenu {...props} />
      </MosaicProvider>,
    );
    const dropDownMenu = getByTestId('oneof-menu');

    // Act
    userEvent.click(dropDownMenu);

    // Assert
    const menuItems = getAllByRole('menuitem');
    expect(menuItems[0]).toHaveTextContent(title0.substring(0, MAX_LENGTH));
    expect(menuItems[1]).toHaveTextContent(title1);
  });
});
