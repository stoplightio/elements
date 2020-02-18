import { prettifyJSON } from '../json';

describe('JSON Prettifier', () => {
  test('should prettify content', () => {
    expect(prettifyJSON(`{"foo":true,"bar":false}`)).toMatchSnapshot();
  });
});
