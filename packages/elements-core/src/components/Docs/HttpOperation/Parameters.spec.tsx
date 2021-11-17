import { HttpParamStyles, IHttpParam } from '@stoplight/types';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

import { Parameter } from './Parameters';

describe('Parameter', () => {
  const data: IHttpParam = {
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
        value: 'example value',
        key: 'example key',
      },
    ],
  };

  const schema = { type: 'array', items: { type: 'string', enum: ['foo', 'bar'] } } as JSONSchema7;

  it('should render correct name and description', async () => {
    render(<Parameter parameter={data} parameterType="query" />);

    expect(await screen.findByText(/parameter name$/)).toBeInTheDocument();
    expect(await screen.findByText(/a parameter description/)).toBeInTheDocument();
  });

  it('should render if parameter is deprecated', async () => {
    render(<Parameter parameter={data} parameterType="query" />);

    expect(await screen.findByText(/deprecated/)).toBeInTheDocument();
  });

  it('should render correct basic type', async () => {
    render(<Parameter parameter={data} parameterType="query" />);

    expect(await screen.findByText(/string/)).toBeInTheDocument();
  });

  it('should render correct array subtype', async () => {
    render(<Parameter parameter={{ ...data, schema: schema }} parameterType="query" />);

    expect(await screen.findByText(/array\[string\]/)).toBeInTheDocument();
  });

  it('should render correct validations', async () => {
    render(<Parameter parameter={data} parameterType="query" />);

    expect(await screen.findByText(/required/)).toBeInTheDocument();
    expect(await screen.findByText(/Default value:/)).toBeInTheDocument();
    expect(await screen.findAllByText(/foo/)).toHaveLength(2);
    expect(await screen.findByText(/bar/)).toBeInTheDocument();
  });

  it('should render validations from schema items', async () => {
    render(<Parameter parameter={{ ...data, schema: schema }} parameterType="query" />);

    expect(await screen.findByText(/Allowed values:/)).toBeInTheDocument();
    expect(await screen.findByText(/foo/)).toBeInTheDocument();
    expect(await screen.findByText(/bar/)).toBeInTheDocument();
  });

  it('should render correct examples', async () => {
    render(<Parameter parameter={data} parameterType="query" />);

    expect(screen.queryByText(/Example value:/)).toBeInTheDocument();
    expect(screen.queryByText(/example value/)).toBeInTheDocument();
    expect(screen.queryByText(/example key/)).not.toBeInTheDocument();
  });
});
