import { IAny, IOperation } from '../../AST';
import { IBool, IBranch, IMagicNode, INumber, IProperty, IString } from '../../AST/basics';
import { IHeaderParam } from '../../AST/HeaderParam';
import { IHeaderParams } from '../../AST/HeaderParams';
import { IPathParam } from '../../AST/PathParam';
import { IPathParams } from '../../AST/PathParams';
import { IQueryParam } from '../../AST/QueryParam';
import { IQueryParams } from '../../AST/QueryParams';
import { IRequest } from '../../AST/Request';
import { IRequestBody } from '../../AST/RequestBody';
import { IRequestExample } from '../../AST/RequestExample';
import { IResponse } from '../../AST/Response';
import { IServer } from '../../AST/Server';

let _id = 0;
const id = () => String(_id++);

type toASTType<T extends string | number | boolean> = T extends string
  ? IString<T>
  : T extends number
  ? INumber
  : T extends boolean
  ? IBool
  : never;

function makeProperty<K extends string, T extends string | boolean | number>(
  parent: IMagicNode,
  key: K,
  value: T,
): IProperty<IString<K>, toASTType<T>> {
  const prop: IProperty<IString<K>, toASTType<T>> = { parent, id: id(), type: 'property' as 'property' };
  prop.key = {
    parent: prop,
    id: id(),
    type: 'string',
    value: key,
  };
  prop.key = {
    parent: prop,
    id: id(),
    type: 'string',
    value: key,
  };
  // @ts-ignore
  prop.value = {
    parent: prop,
    id: id(),
    type: typeof value,
    value,
  };
  return prop;
}

export const httpOperation: IOperation = {
  id: id(),
  type: 'operation',
  children: [],
};

httpOperation.children.push(
  {
    parent: httpOperation,
    id: id(),
    type: 'propertyDescription',
    value:
      "The address-recognition API makes it easy for you to extract address data from unstructured text, including the recipient name, line 1, line 2, city, postal code, and more.\n\nData often enters your system as unstructured text (for example: emails, SMS messages, support tickets, or other documents). ShipEngine's address-recognition API helps you extract meaningful, structured data from this unstructured text. The parsed address data is returned in the same structure that's used for other ShipEngine APIs, such as address validation, rate quotes, and shipping labels.\n\n> **Note:** Address recognition is currently supported for the United States, Canada, Australia, New Zealand, the United Kingdom, and Ireland.\n",
  },
  {
    parent: httpOperation,
    id: id(),
    type: 'propertyMethod',
    value: 'put',
  },
  {
    parent: httpOperation,
    id: id(),
    type: 'propertyPath',
    value: '/v1/addresses/recognize',
  },
);

// server

{
  const server: IServer = {
    parent: httpOperation,
    id: id(),
    type: 'server',
    children: [],
  };
  httpOperation.children.push(server);

  server.children.push(makeProperty(server, 'url', 'https://api.shipengine.com'));
}

// Request

const request: IRequest = {
  parent: httpOperation,
  id: id(),
  type: 'request',
  children: [],
};
httpOperation.children.push(request);

// Query Params

{
  const params: IQueryParams = {
    parent: request,
    id: id(),
    type: 'queryParams',
    children: [],
  };
  request.children.push(params);

  // Query Param 'limit'

  {
    const param: IQueryParam = {
      parent: params,
      id: id(),
      type: 'queryParam',
      children: [],
    };
    params.children.push(param);

    param.children.push(
      {
        parent: param,
        id: id(),
        type: 'propertyName',
        value: 'limit',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyDescription',
        value: 'How many todos to limit?',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyDeprecated',
        value: true,
      },
      {
        parent: param,
        id: id(),
        type: 'propertyStyleQueryParam',
        value: 'form',
      },
    );
  }

  // Query Param 'value'

  {
    const param: IQueryParam = {
      parent: params,
      id: id(),
      type: 'queryParam',
      children: [],
    };
    params.children.push(param);

    param.children.push(
      {
        parent: param,
        id: id(),
        type: 'propertyName',
        value: 'value',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyDescription',
        value: 'How many string todos to limit?',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyDeprecated',
        value: true,
      },
      {
        parent: param,
        id: id(),
        type: 'propertyStyleQueryParam',
        value: 'form',
      },
    );
  }

  // Query Param 'completed'

  {
    const param: IQueryParam = {
      parent: params,
      id: id(),
      type: 'queryParam',
      children: [],
    };
    params.children.push(param);

    param.children.push(
      {
        parent: param,
        id: id(),
        type: 'propertyName',
        value: 'completed',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyDescription',
        value: 'Only return completed',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyStyleQueryParam',
        value: 'form',
      },
    );
  }
}

// Header Params

{
  const params: IHeaderParams = {
    parent: request,
    id: id(),
    type: 'headerParams',
    children: [],
  };
  request.children.push(params);

  // Header Param 'completed'

  {
    const param: IHeaderParam = {
      parent: request,
      id: id(),
      type: 'headerParam',
      children: [],
    };
    params.children.push(param);

    param.children.push(
      {
        parent: param,
        id: id(),
        type: 'propertyName',
        value: 'account-id',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyDescription',
        value: 'Your Stoplight account id',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyStyleHeaderParam',
        value: 'simple',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyRequired',
        value: true,
      },
    );
  }
}

// Path Params

{
  const params: IPathParams = {
    parent: request,
    id: id(),
    type: 'pathParams',
    children: [],
  };
  request.children.push(params);

  // Path Param 'todoId'

  {
    const param: IPathParam = {
      parent: request,
      id: id(),
      type: 'pathParam',
      children: [],
    };
    params.children.push(param);

    param.children.push(
      {
        parent: param,
        id: id(),
        type: 'propertyName',
        value: 'todoId',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyStylePathParam',
        value: 'simple',
      },
      {
        parent: param,
        id: id(),
        type: 'propertyRequired',
        value: true,
      },
    );
  }
}

// Request Body

{
  const body: IRequestBody = {
    parent: request,
    id: id(),
    type: 'requestBody',
    children: [],
  };
  request.children.push(body);

  body.children.push(
    makeProperty(
      body,
      'description',
      "The only required field is `text`, which is the text to be parsed. You can optionally also provide an `address` containing already-known values. For example, you may already know the recipient's name, city, and country, and only want to parse the street address into separate lines.\n",
    ),
    makeProperty(body, 'required', true),
  );

  // Text Only Example

  {
    const example: IRequestExample = {
      parent: body,
      id: id(),
      type: 'requestExample',
      children: [],
    };
    example.children.push(
      makeProperty(body, 'key', 'text_only'),
      makeProperty(body, 'summary', 'Text only'),
      makeProperty(
        body,
        'description',
        'This is the simplest way to call the address-recognition API. Just pass the text to be parsed and nothing else.\n',
      ),
      makeProperty(
        body,
        'example',
        '{ "text": "Margie McMiller at 3800 North Lamar suite 200 in austin, tx.  The zip code there is 78652." }',
      ),
    );
  }

  // Some Known Fields Example

  {
    const example: IRequestExample = {
      parent: body,
      id: id(),
      type: 'requestExample',
      children: [],
    };
    example.children.push(
      makeProperty(body, 'key', 'some_known_fields'),
      makeProperty(body, 'summary', 'Some known fields'),
      makeProperty(
        body,
        'description',
        "You can optionally provide an `address` object containing any already-known values. For example, you may already know the recipient's name, city, and country, and only want to parse the street address into separate lines.\n",
      ),
      makeProperty(
        body,
        'example',
        `{
        text: 'Margie McMiller at 3800 North Lamar suite 200 in austin, tx.  The zip code there is 78652.',
        address: {
          country_code: 'US',
          address_residential_indicator: 'yes',
        },
      }`,
      ),
    );
  }
}

// 200
{
  const response: IResponse = {
    parent: httpOperation,
    id: id(),
    type: 'response',
    children: [],
  };
  httpOperation.children.push(response);

  response.children.push(
    makeProperty(response, 'code', 200),
    makeProperty(
      response,
      'description',
      'Returns the parsed address, as well as a confidence score and a list of all the entities that were recognized in the text.\n',
    ),
  );
}

// 400

{
  const response: IResponse = {
    parent: httpOperation,
    id: id(),
    type: 'response',
    children: [],
  };
  httpOperation.children.push(response);

  response.children.push(
    makeProperty(response, 'code', 400),
    makeProperty(response, 'description', 'The request contained errors.'),
  );
}

// 500

{
  const response: IResponse = {
    parent: httpOperation,
    id: id(),
    type: 'response',
    children: [],
  };
  httpOperation.children.push(response);

  response.children.push(
    makeProperty(response, 'code', 400),
    makeProperty(
      response,
      'description',
      "An error occurred on ShipEngine's side.\n\n> This error will automatically be reported to our engineers.\n",
    ),
  );
}

// @ts-ignore
httpOperation.serialize = () => {
  return JSON.parse(
    JSON.stringify(httpOperation, (key, value) => {
      return key === 'parent' ? value.id : value;
    }),
  );
};

// @ts-ignore
console.log(httpOperation.serialize());

export function MapIds(o: IAny, map: Map<string, any> = new Map()): Map<string, IAny> {
  map.set(o.id, o);
  if ('children' in o) {
    for (const entry of o.children) {
      // @ts-ignore
      MapIds(entry, map);
    }
  }
  return map;
}

export const IdMap = MapIds(httpOperation);
