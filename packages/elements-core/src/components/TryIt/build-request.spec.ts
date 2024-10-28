import { IHttpOperation } from '@stoplight/types';

import { operation as minimalOperation } from '../../__fixtures__/operations/operation-minimal';
import httpOperation from '../../__fixtures__/operations/operation-parameters';
import { getAcceptedMimeTypes, getQueryParams } from './build-request';

describe('Build Request', () => {
  describe('Query params', () => {
    it('Handles operation without query params', () => {
      const params = getQueryParams({ httpOperation: minimalOperation, parameterValues: {} });

      expect(params).toStrictEqual([]);
    });

    it('Handles parameters without values', () => {
      const params = getQueryParams({ httpOperation, parameterValues: { value: '' } });

      expect(params).toStrictEqual([]);
    });

    it('Handles invalid JSON values', () => {
      expect(() => {
        getQueryParams({ httpOperation, parameterValues: { nested: '{' } });
      }).toThrowError('JSON object expected');

      expect(() => {
        getQueryParams({ httpOperation, parameterValues: { nested: '123' } });
      }).toThrowError('JSON object expected');

      expect(() => {
        getQueryParams({ httpOperation, parameterValues: { items: '[' } });
      }).toThrowError('JSON array expected');

      expect(() => {
        getQueryParams({ httpOperation, parameterValues: { items: '123' } });
      }).toThrowError('JSON array expected');
    });

    it('Supports form and deepObject style', () => {
      const params = getQueryParams({
        httpOperation,
        parameterValues: {
          value: '1',
          items: '["first","second"]',
          items_not_exploded: '["first","second"]',
          default_style_items: '["first","second"]',
          nested: '{"key":"value"}',
          nested_not_exploded: '{"key":"value"}',
          deep_object: '{"key":"value", "number": 2}',
        },
      });

      expect(params).toStrictEqual([
        { name: 'value', value: '1' },
        { name: 'items', value: 'first' },
        { name: 'items', value: 'second' },
        { name: 'items_not_exploded', value: 'first,second' },
        { name: 'default_style_items', value: 'first' },
        { name: 'default_style_items', value: 'second' },
        { name: 'key', value: 'value' },
        { name: 'nested_not_exploded', value: 'key,value' },
        { name: 'deep_object[key]', value: 'value' },
        { name: 'deep_object[number]', value: '2' },
      ]);
    });

    it('Supports spaceDelimited style', () => {
      const params = getQueryParams({
        httpOperation,
        parameterValues: { items_spaces: '["first","second"]', items_spaces_not_exploded: '["first","second"]' },
      });

      expect(params).toStrictEqual([
        { name: 'items_spaces', value: 'first' },
        { name: 'items_spaces', value: 'second' },
        { name: 'items_spaces_not_exploded', value: 'first second' },
      ]);
    });

    it('Supports pipeDelimited style', () => {
      const params = getQueryParams({
        httpOperation,
        parameterValues: { items_pipes: '["first","second"]', items_pipes_not_exploded: '["first","second"]' },
      });

      expect(params).toStrictEqual([
        { name: 'items_pipes', value: 'first' },
        { name: 'items_pipes', value: 'second' },
        { name: 'items_pipes_not_exploded', value: 'first|second' },
      ]);
    });

    it('Splits string arrays by a respective delimiter', () => {
      const params = getQueryParams({
        httpOperation,
        parameterValues: {
          items: '"first,second"',
          items_spaces: '"first second"',
          items_pipes: '"first|second"',
        },
      });

      expect(params).toStrictEqual([
        { name: 'items', value: 'first' },
        { name: 'items', value: 'second' },
        { name: 'items_spaces', value: 'first' },
        { name: 'items_spaces', value: 'second' },
        { name: 'items_pipes', value: 'first' },
        { name: 'items_pipes', value: 'second' },
      ]);
    });
  });

  describe('getAcceptedMimeTypes', () => {
    const operationSingleResponse: IHttpOperation = {
      id: 'adsf',
      method: 'GET',
      path: '/a/path',
      responses: [
        {
          id: 'responseA',
          code: '200',
          contents: [
            {
              id: 'adsf',
              mediaType: 'application/json',
            },
            {
              id: 'dfvs',
              mediaType: 'application/json',
            },
            {
              id: 'aaaa',
              mediaType: 'multipart/form-data',
            },
          ],
        },
      ],
    };

    const operationMultipleResponses: IHttpOperation = {
      id: 'sfdf',
      method: 'POST',
      path: '/a/nother/path',
      responses: [
        {
          id: 'responseA',
          code: '200',
          contents: [
            {
              id: 'adsf',
              mediaType: 'application/json',
            },
            {
              id: 'dfvs',
              mediaType: 'application/json',
            },
          ],
        },
        {
          id: 'responseB',
          code: '200',
          contents: [
            {
              id: 'adsf',
              mediaType: 'application/json',
            },
            {
              id: 'dfvs',
              mediaType: 'multipart/form-data',
            },
          ],
        },
        {
          id: 'responseC',
          code: '200',
          contents: [
            {
              id: 'dfvs',
              mediaType: 'multipart/form-data',
            },
          ],
        },
        {
          id: 'responseB',
          code: '200',
          contents: [
            {
              id: 'adsf',
              mediaType: 'text/json',
            },
            {
              id: 'dfvs',
              mediaType: 'multipart/form-data',
            },
          ],
        },
      ],
    };

    it('Handles a single response with duplicates', () => {
      expect(getAcceptedMimeTypes(operationSingleResponse)).toStrictEqual(['application/json', 'multipart/form-data']);
    });

    it('Handles multiple responses and dedups appropriately', () => {
      expect(getAcceptedMimeTypes(operationMultipleResponses)).toStrictEqual([
        'application/json',
        'multipart/form-data',
        'text/json',
      ]);
    });
  });
});
