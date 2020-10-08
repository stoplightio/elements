import { IAny, IOperation } from '../../AST';
import { getId, YDoc, Yify, Yjsify } from '../../YAST/YDoc';

export const ydoc = new YDoc('shipengine');
// @ts-ignore
window.ydoc = ydoc;

const makeOperation: () => Yify<IOperation> = () =>
  Yjsify({
    type: 'operation' as const,
    children: [
      {
        type: 'description' as const,
        value:
          "The address-recognition API makes it easy for you to extract address data from unstructured text, including the recipient name, line 1, line 2, city, postal code, and more.\n\nData often enters your system as unstructured text (for example: emails, SMS messages, support tickets, or other documents). ShipEngine's address-recognition API helps you extract meaningful, structured data from this unstructured text. The parsed address data is returned in the same structure that's used for other ShipEngine APIs, such as address validation, rate quotes, and shipping labels.\n\n> **Note:** Address recognition is currently supported for the United States, Canada, Australia, New Zealand, the United Kingdom, and Ireland.\n",
      },
      {
        type: 'httpMethod' as const,
        value: 'put',
      },
      {
        type: 'path' as const,
        value: '/v1/addresses/recognize',
      },
      {
        type: 'server' as const,
        children: [
          {
            type: 'url' as const,
            value: 'https://api.shipengine.com',
          },
        ],
      },
      {
        type: 'request' as const,
        children: [
          {
            type: 'queryParams' as const,
            children: [
              {
                type: 'param' as const,
                children: [
                  {
                    type: 'name',
                    value: 'limit',
                  },
                  {
                    type: 'description',
                    value: 'How many todos to limit?',
                  },
                  {
                    type: 'deprecated',
                    value: true,
                  },
                  {
                    type: 'style',
                    value: 'form',
                  },
                ],
              },
              {
                type: 'param' as const,
                children: [
                  {
                    type: 'name',
                    value: 'value',
                  },
                  {
                    type: 'description',
                    value: 'How many string todos to limit?',
                  },
                  {
                    type: 'deprecated',
                    value: true,
                  },
                  {
                    type: 'style',
                    value: 'form',
                  },
                ],
              },
              {
                type: 'param' as const,
                children: [
                  {
                    type: 'name',
                    value: 'completed',
                  },
                  {
                    type: 'description',
                    value: 'Only return completed',
                  },
                  {
                    type: 'style',
                    value: 'form',
                  },
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
            ],
          },
          {
            type: 'headerParams' as const,
            children: [
              {
                type: 'param' as const,
                children: [
                  {
                    type: 'name',
                    value: 'account-id',
                  },
                  {
                    type: 'description',
                    value: 'Your Stoplight account id',
                  },
                  {
                    type: 'style',
                    value: 'simple',
                  },
                  {
                    type: 'required',
                    value: true,
                  },
                ],
              },
            ],
          },
          {
            type: 'pathParams' as const,
            children: [
              {
                type: 'param' as const,
                children: [
                  {
                    type: 'name',
                    value: 'todoId',
                  },
                  {
                    type: 'style',
                    value: 'simple',
                  },
                  {
                    type: 'required',
                    value: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'responses' as const,
        children: [
          {
            type: 'response' as const,
            children: [
              {
                type: 'httpStatus' as const,
                value: '200',
              },
              {
                type: 'description' as const,
                value:
                  'Returns the parsed address, as well as a confidence score and a list of all the entities that were recognized in the text.\n',
              },
            ],
          },
          {
            type: 'response' as const,
            children: [
              {
                type: 'httpStatus' as const,
                value: '400',
              },
              {
                type: 'description' as const,
                value: 'The request contained errors.',
              },
            ],
          },
          {
            type: 'response' as const,
            children: [
              {
                type: 'httpStatus' as const,
                value: '500',
              },
              {
                type: 'description' as const,
                value:
                  "An error occurred on ShipEngine's side.\n\n> This error will automatically be reported to our engineers.\n",
              },
            ],
          },
        ],
      },
    ],
  });

export const resetOperation = () => {
  const httpOperation = makeOperation();
  ydoc.doc.getMap('root').set('operation', httpOperation);
  console.log('httpOperation', httpOperation);
};

ydoc.ready.then(() => {
  if (!ydoc.doc.getMap('root').has('operation')) {
    console.log('Populating with initial data.');
    resetOperation();
  }
});

// // Request

// // Request Body

// {
//   const body: IRequestBody = {
//     parent: request,
//     id: id(),
//     type: 'requestBody',
//     children: [],
//   };
//   request.children.push(body);

//   body.children.push(
//     makeProperty(
//       body,
//       'description',
//       "The only required field is `text`, which is the text to be parsed. You can optionally also provide an `address` containing already-known values. For example, you may already know the recipient's name, city, and country, and only want to parse the street address into separate lines.\n",
//     ),
//     makeProperty(body, 'required', true),
//   );

//   // Text Only Example

//   {
//     const example: IRequestExample = {
//       parent: body,
//       id: id(),
//       type: 'requestExample',
//       children: [],
//     };
//     example.children.push(
//       makeProperty(body, 'key', 'text_only'),
//       makeProperty(body, 'summary', 'Text only'),
//       makeProperty(
//         body,
//         'description',
//         'This is the simplest way to call the address-recognition API. Just pass the text to be parsed and nothing else.\n',
//       ),
//       makeProperty(
//         body,
//         'example',
//         '{ "text": "Margie McMiller at 3800 North Lamar suite 200 in austin, tx.  The zip code there is 78652." }',
//       ),
//     );
//   }

//   // Some Known Fields Example

//   {
//     const example: IRequestExample = {
//       parent: body,
//       id: id(),
//       type: 'requestExample',
//       children: [],
//     };
//     example.children.push(
//       makeProperty(body, 'key', 'some_known_fields'),
//       makeProperty(body, 'summary', 'Some known fields'),
//       makeProperty(
//         body,
//         'description',
//         "You can optionally provide an `address` object containing any already-known values. For example, you may already know the recipient's name, city, and country, and only want to parse the street address into separate lines.\n",
//       ),
//       makeProperty(
//         body,
//         'example',
//         `{
//         text: 'Margie McMiller at 3800 North Lamar suite 200 in austin, tx.  The zip code there is 78652.',
//         address: {
//           country_code: 'US',
//           address_residential_indicator: 'yes',
//         },
//       }`,
//       ),
//     );
//   }
// }

// // @ts-ignore
// httpOperation.serialize = () => {
//   return JSON.parse(
//     JSON.stringify(httpOperation, (key, value) => {
//       return key === 'parent' ? value.id : value;
//     }),
//   );
// };

// // @ts-ignore
// console.log(httpOperation.serialize());

export function MapIds(o?: Yify<IAny>, map: Map<string, any> = new Map()): Map<string, Yify<IAny>> {
  if (typeof o === 'undefined') return map;

  map.set(getId(o), o);
  if (o.has('children')) {
    // @ts-ignore
    for (const entry of o.get('children')) {
      // @ts-ignore
      MapIds(entry, map);
    }
  }
  return map;
}

export const getIdMap = () => MapIds(ydoc.doc.getMap('root').get('operation'));
