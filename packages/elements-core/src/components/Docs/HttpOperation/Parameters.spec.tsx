import { HttpParamStyles, IHttpParam } from '@stoplight/types';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { JSONSchema7 } from 'json-schema';
import { omit } from 'lodash';
import * as React from 'react';

import { Parameters } from './Parameters';

describe('Parameter', () => {
  const data: IHttpParam = {
    id: '?http-example-example-key?',
    name: 'parameter name',
    description: 'a parameter description',
    schema: {
      enum: ['foo', 'bar'],
      default: 'foo',
      type: 'string',
    },
    deprecated: true,
    explode: true,
    required: true,
    style: HttpParamStyles.Form,
    examples: [
      {
        id: '?http-example-example-key?',
        value: 'example value',
        key: 'example key',
      },
    ],
  };

  const schema = { type: 'array', items: { type: 'string', enum: ['foo', 'bar'] } } as JSONSchema7;

  it('should render correct name and description', async () => {
    render(<Parameters parameters={[data]} parameterType="query" />);

    expect(await screen.findByText(/parameter name$/)).toBeInTheDocument();
    expect(await screen.findByText(/a parameter description/)).toBeInTheDocument();
  });

  it('should render if parameter is deprecated', async () => {
    render(<Parameters parameters={[data]} parameterType="query" />);

    expect(await screen.findByText(/deprecated/)).toBeInTheDocument();
  });

  it('should render correct basic type', async () => {
    render(<Parameters parameters={[data]} parameterType="query" />);

    expect(await screen.findByText(/string/)).toBeInTheDocument();
  });

  it('should render correct array subtype', async () => {
    render(<Parameters parameters={[{ ...data, schema: schema }]} parameterType="query" />);

    expect(await screen.findByText(/array\[string\]/)).toBeInTheDocument();
  });

  it('should render correct validations', async () => {
    render(<Parameters parameters={[data]} parameterType="query" />);

    expect(await screen.findByText(/required/)).toBeInTheDocument();
    expect(await screen.findByText(/Default:/)).toBeInTheDocument();
    expect(await screen.findAllByText(/foo/)).toHaveLength(2);
    expect(await screen.findByText(/bar/)).toBeInTheDocument();
  });

  it('should render validations from schema items', async () => {
    render(<Parameters parameters={[{ ...data, schema: schema }]} parameterType="query" />);

    expect(await screen.findByText(/Allowed values:/)).toBeInTheDocument();
    expect(await screen.findByText(/foo/)).toBeInTheDocument();
    expect(await screen.findByText(/bar/)).toBeInTheDocument();
  });

  it('should render correct examples', async () => {
    render(<Parameters parameters={[data]} parameterType="query" />);

    expect(screen.queryByText(/Example:/)).toBeInTheDocument();
    expect(screen.queryByText(/example value/)).toBeInTheDocument();
    expect(screen.queryByText(/example key/)).not.toBeInTheDocument();
  });

  it('should render scheme-less params', async () => {
    render(
      <Parameters
        parameters={[
          { ...data, name: 'param' },
          omit({ ...data, name: 'param 2', description: 'a param 2 description' }, 'schema'),
          omit({ ...data, name: 'param 3', description: 'a param 3 description', deprecated: false }, 'schema'),
        ]}
        parameterType="query"
      />,
    );

    expect(await screen.findByText(/a parameter description/)).toBeInTheDocument();
    expect(await screen.findByText(/a param 2 description/)).toBeInTheDocument();
    expect(await screen.findByText(/a param 3 description/)).toBeInTheDocument();
  });
});
