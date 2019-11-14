import { Validations } from '@stoplight/json-schema-viewer';
import { mount, ReactWrapper } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { HttpOperation } from '../HttpOperation';

jest.mock('../../hooks/useResolver', () => ({
  useResolver: (type: any, result: any) => ({ result }),
}));

describe('HttpOperation', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Query Parameters', () => {
    it('should render validations popover with correct validations', () => {
      wrapper = mount(
        <HttpOperation
          value={{
            request: {
              query: [
                {
                  name: 'parameter name',
                  description: 'a parameter description',
                  schema: {
                    type: 'string',
                  },
                  allowEmptyValue: true,
                  allowReserved: true,
                  deprecated: true,
                  explode: true,
                  required: true,
                  style: 'form',
                  examples: [
                    {
                      value: 'example value',
                    },
                  ],
                },
              ],
            },
          }}
        />,
      );

      expect(wrapper.find(Validations)).toHaveProp('validations', {
        allowEmptyValue: true,
        allowReserved: true,
        deprecated: true,
        explode: true,
        examples: [
          {
            value: 'example value',
          },
        ],
      });
    });
  });

  describe('Header Parameters', () => {
    it('should render validations popover with correct validations', () => {
      wrapper = mount(
        <HttpOperation
          value={{
            request: {
              headers: [
                {
                  name: 'parameter name',
                  description: 'a parameter description',
                  schema: {
                    type: 'string',
                  },
                  allowEmptyValue: true,
                  allowReserved: true,
                  deprecated: true,
                  explode: true,
                  required: true,
                  style: 'simple',
                  examples: [
                    {
                      value: 'example value',
                    },
                  ],
                },
              ],
            },
          }}
        />,
      );

      expect(wrapper.find(Validations)).toHaveProp('validations', {
        allowEmptyValue: true,
        allowReserved: true,
        deprecated: true,
        explode: true,
        examples: [
          {
            value: 'example value',
          },
        ],
      });
    });
  });

  describe('Path Parameters', () => {
    it('should render validations popover with correct validations', () => {
      wrapper = mount(
        <HttpOperation
          value={{
            request: {
              path: [
                {
                  name: 'parameter name',
                  description: 'a parameter description',
                  schema: {
                    type: 'string',
                  },
                  allowEmptyValue: true,
                  allowReserved: true,
                  deprecated: true,
                  explode: true,
                  required: true,
                  style: 'form',
                  examples: [
                    {
                      value: 'example value',
                    },
                  ],
                },
              ],
            },
          }}
        />,
      );

      expect(wrapper.find(Validations)).toHaveProp('validations', {
        allowEmptyValue: true,
        allowReserved: true,
        deprecated: true,
        explode: true,
        examples: [
          {
            value: 'example value',
          },
        ],
      });
    });
  });
});
