import 'jest-enzyme';

import { IHttpService } from '@stoplight/types';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import httpService from '../../../../__fixtures__/services/petstore';
import { HttpService } from '../index';

// jest.mock('../../../hooks/useResolver', () => ({
//   useResolver: (type: any, result: any) => ({ result }),
// }));

describe('HttpService', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {
    wrapper = mount(<HttpService data={httpService} />);

    expect(wrapper).toMatchSnapshot();
  });
});
