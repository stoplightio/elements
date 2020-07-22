import 'jest-enzyme';

import { FileInput, RadioGroup } from '@blueprintjs/core';
import { CodeEditor } from '@stoplight/ui-kit';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import { RequestMakerProvider } from '../../../hooks/useRequestMaker';
import { RequestMakerStore } from '../../../stores/request-maker';
import { RequestBody } from '../Request/Body';
import { RequestParameters } from '../Request/Parameters';

describe('RequestBody', () => {
  let wrapper: ReactWrapper;

  const setWrapper = (store: RequestMakerStore) => {
    wrapper = mount(
      <RequestMakerProvider value={store}>
        <RequestBody />
      </RequestMakerProvider>,
    );
  };

  afterEach(() => {
    wrapper.unmount();
  });

  describe('content-type: none', () => {
    it('should render empty message', () => {
      const store = new RequestMakerStore();
      store.request.contentType = 'none';

      setWrapper(store);

      expect(wrapper.find(RadioGroup)).toHaveProp('selectedValue', 'none');
      expect(wrapper.html()).toContain('This request does not have a body');
    });
  });

  describe('content-type: raw', () => {
    it('should render CodeEditor', () => {
      const store = new RequestMakerStore();
      store.request.contentType = 'raw';
      store.request.body = 'test';

      setWrapper(store);

      expect(wrapper.find(RadioGroup)).toHaveProp('selectedValue', 'raw');
      expect(wrapper.find(CodeEditor)).toHaveProp('value', 'test');
    });
  });

  describe('content-type: binary', () => {
    it('should render FileInput', () => {
      const store = new RequestMakerStore();
      store.request.contentType = 'binary';

      setWrapper(store);

      expect(wrapper.find(RadioGroup)).toHaveProp('selectedValue', 'binary');
      expect(wrapper.find(FileInput)).toExist();
    });
  });

  describe('content-type: graphql', () => {
    it('should render two CodeEditors', () => {
      const store = new RequestMakerStore();
      store.request.contentType = 'graphql';
      store.request.graphqlQuery = `query(test: $test) { id }`;
      store.request.graphqlVariables = `{ test: "foo" }`;

      setWrapper(store);

      expect(wrapper.find(RadioGroup)).toHaveProp('selectedValue', 'graphql');
      expect(wrapper.find(CodeEditor).first()).toHaveProp('value', `query(test: $test) { id }`);
      expect(wrapper.find(CodeEditor).last()).toHaveProp('value', `{ test: "foo" }`);
    });
  });

  describe('content-type: form-data', () => {
    it('should render RequestParameters', () => {
      const store = new RequestMakerStore();
      store.request.contentType = 'form-data';

      setWrapper(store);

      expect(wrapper.find(RadioGroup)).toHaveProp('selectedValue', 'form-data');
      expect(wrapper.find(RequestParameters)).toHaveProp('type', 'formData');
    });
  });

  describe('content-type: x-www-form-urlencoded', () => {
    it('should render RequestParameters', () => {
      const store = new RequestMakerStore();
      store.request.contentType = 'x-www-form-urlencoded';

      setWrapper(store);

      expect(wrapper.find(RadioGroup)).toHaveProp('selectedValue', 'x-www-form-urlencoded');
      expect(wrapper.find(RequestParameters)).toHaveProp('type', 'urlEncoded');
    });
  });
});
