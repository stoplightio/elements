import { HttpSecurityScheme, INodeExample, INodeExternalExample, IOauth2SecurityScheme } from '@stoplight/types';
import { capitalize, flatMap, isObject, keys, uniq } from 'lodash';

export function getExamplesObject(examples: Array<INodeExample | INodeExternalExample>) {
  return examples.reduce((collection, item) => {
    const value = 'externalValue' in item ? item.externalValue : item.value;
    if (value) {
      collection[item.key] = value;
    }

    return collection;
  }, {});
}

export function getExamplesFromSchema(data: unknown) {
  // `examples` are available in JSON Schema v6 and v7. For v4 we can use `x-examples`.
  // `example` is not supported by any version but we can use `x-example` extension.
  return isObject(data)
    ? {
        ...(isObject(data['x-examples']) && { ...data['x-examples'] }),
        ...(isObject(data['examples']) && { ...data['examples'] }),
        ...('x-example' in data && { default: data['x-example'] }),
      }
    : void 0;
}

export function getReadableSecurityName(securityScheme: HttpSecurityScheme) {
  switch (securityScheme.type) {
    case 'apiKey':
      return 'API Key';
    case 'http':
      return `${capitalize(securityScheme.scheme)} Auth`;
    case 'oauth2':
      const scopes = uniq(flatMap(keys(securityScheme.flows), getOauthScopeMapper(securityScheme)));
      return `OAuth 2 (${scopes.join(', ')})`;
    case 'openIdConnect':
      return 'OpenID Connect';
  }
}

const getOauthScopeMapper = (securityScheme: IOauth2SecurityScheme) => (flow: string) => {
  if (!['implicit', 'password', 'clientCredentials', 'authorizationCode'].includes(flow)) return [];
  return keys(securityScheme.flows[flow]?.scopes);
};
