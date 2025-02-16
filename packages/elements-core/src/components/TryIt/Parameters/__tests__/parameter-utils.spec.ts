import { isRegularNode, SchemaTree } from '@stoplight/json-schema-tree';
import { last } from 'lodash';

import { isRequired } from '../parameter-utils';

describe('isRequired', () => {
  it('happy path', () => {
    // Arrange
    const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      description: 'Authenticate for a refresh and access token',
      title: 'authenticate',
      allOf: [
        {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },
        {
          type: 'object',
          properties: {
            client_id: { type: 'string' },
            client_secret: { type: 'string' },
          },
          required: ['client_id', 'client_secret'],
        },
      ],
    };
    const tree = new SchemaTree(schema, { mergeAllOf: true, refResolver: null });
    tree.populate();
    const root = tree.root.children[0];
    if (!isRegularNode(root)) {
      fail('the schema should have been parsed so that this is a RegularNode');
    }

    if (!root.children) {
      fail('the combined properties in the allOf should be the children of this RegularNode');
    }

    const children = root.children ?? [];

    // Act
    const unknownChildren = children.filter(c => isRequired(c) === undefined);
    const requiredChildren = children
      .filter(c => isRequired(c) === true)
      .map(c => last(c.path))
      .sort();
    const optionalChildren = children
      .filter(c => isRequired(c) === false)
      .map(c => last(c.path))
      .sort();

    // Assert
    expect(unknownChildren).toStrictEqual([]);
    expect(requiredChildren).toStrictEqual(['client_id', 'client_secret']);
    expect(optionalChildren).toStrictEqual(['password', 'username']);
  });
});
