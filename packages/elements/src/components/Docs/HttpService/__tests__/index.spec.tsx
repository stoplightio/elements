import 'jest-enzyme';

import { render } from '@testing-library/react';
import * as React from 'react';

import httpService from '../../../../__fixtures__/services/petstore';
import { HttpService } from '../index';

describe('HttpService', () => {
  it('Should render correctly', () => {
    const wrapper = render(<HttpService data={httpService} />);

    expect(wrapper.getByText(httpService.name).tagName.toLowerCase()).toBe('h1');
  });
});
