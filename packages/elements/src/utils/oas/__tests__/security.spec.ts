import { getServiceUriFromOperation } from '../security';

describe('getServiceUriFromOperation', () => {
  it('finds service uri from `paths` operation uri', () => {
    const serviceUri = getServiceUriFromOperation('http://api/reference/todos/todo.v1.yaml/paths/~1todos/get');
    expect(serviceUri).toEqual('http://api/reference/todos/todo.v1.yaml');
  });

  it('finds service uri from `operations` operation uri', () => {
    const serviceUri = getServiceUriFromOperation('http://api/reference/todos/todo.v1.yaml/operations/get-todos');
    expect(serviceUri).toEqual('http://api/reference/todos/todo.v1.yaml');
  });

  it('finds service uri from relative operation', () => {
    const serviceUri = getServiceUriFromOperation('/operations/get-todos');
    expect(serviceUri).toEqual('/');
  });
});
