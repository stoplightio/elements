import 'jest-enzyme';

import { HttpSecurityScheme } from '@stoplight/types';
import { mount, ReactWrapper } from 'enzyme';
import { flatten } from 'lodash';
import * as React from 'react';

import { HttpSecuritySchemes } from '../index';

describe('HttpSecuritySchemes', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render null with no securities', () => {
    wrapper = mount(<HttpSecuritySchemes securities={undefined} />);

    expect(wrapper).toBeEmptyRender();
  });

  it('should render null with empty securities', () => {
    wrapper = mount(<HttpSecuritySchemes securities={[]} />);

    expect(wrapper).toBeEmptyRender();
  });

  it('should match snapshot', () => {
    const securities: HttpSecurityScheme[][] = [
      [
        {
          key: 'api_key',
          type: 'apiKey',
          name: 'API Key',
          in: 'query',
          description: "Use `?apikey=123` to authenticate requests. It's super secure.",
        },
      ],
      [
        {
          key: 'basicKey',
          type: 'http',
          scheme: 'basic',
          description:
            'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
        },
      ],
      [
        {
          key: 'bearerKey',
          type: 'http',
          scheme: 'bearer',
          description:
            'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
          bearerFormat: 'Authorization',
        },
      ],
      [
        {
          key: 'openIdConnectKey',
          type: 'openIdConnect',
          description:
            'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
          openIdConnectUrl: 'http://openIdConnect.com',
        },
      ],
      [
        {
          key: 'oauth2Key',
          type: 'oauth2',
          description:
            'Get access to data while protecting your account credentials. OAuth2 is also a safer and more secure way to give you access.',
          flows: {
            implicit: {
              scopes: {
                'write:pets': 'modify pets in your account',
                'read:pets': 'read your pets',
              },
              refreshUrl: 'http://refreshUrl.com',
              authorizationUrl: 'http://authorizationUrl.com',
            },
            password: {
              scopes: {
                'write:pets': 'modify pets in your account',
                'read:pets': 'read your pets',
              },
              refreshUrl: 'http://refreshUrl.com',
              tokenUrl: 'http://tokenUrl.com',
            },
            clientCredentials: {
              scopes: {
                'write:pets': 'modify pets in your account',
                'read:pets': 'read your pets',
              },
              refreshUrl: 'http://refreshUrl.com',
              tokenUrl: 'http://tokenUrl.com',
            },
            authorizationCode: {
              scopes: {
                'write:pets': 'modify pets in your account',
                'read:pets': 'read your pets',
              },
              refreshUrl: 'http://refreshUrl.com',
              tokenUrl: 'http://tokenUrl.com',
              authorizationUrl: 'http://authorizationUrl.com',
            },
          },
        },
      ],
    ];

    wrapper = mount(<HttpSecuritySchemes securities={flatten(securities)} />);

    expect(wrapper).toMatchSnapshot();
  });
});
