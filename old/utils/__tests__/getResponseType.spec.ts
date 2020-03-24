import { getResponseType } from '../getResponseType';

describe('getResponseType', () => {
  it('should survive an empty input value', () => {
    expect(getResponseType('')).toBe('');
  });

  it('should recognize JSON correctly', () => {
    expect(getResponseType('application/json')).toEqual('json');
    expect(getResponseType('application/json; charset=utf-8')).toEqual('json');
    expect(getResponseType('application/problem+json; charset=utf-8')).toEqual('json');
  });

  it('should recognize XML correctly', () => {
    expect(getResponseType('application/xml')).toEqual('xml');
    expect(getResponseType('application/xhtml+xml')).toEqual('xml');
    expect(getResponseType('application/wsdl+xml')).toEqual('xml');
    expect(getResponseType('application/xml; charset=utf-8')).toEqual('xml');
    expect(getResponseType('text/xml')).toEqual('xml');
  });

  it('should recognize HTML correctly', () => {
    expect(getResponseType('text/html')).toEqual('html');
    expect(getResponseType('text/html; charset=utf-8')).toEqual('html');
  });

  it('should recognize IMG correctly', () => {
    expect(getResponseType('image/png')).toEqual('img');
    expect(getResponseType('image/jpeg')).toEqual('img');
  });
});
