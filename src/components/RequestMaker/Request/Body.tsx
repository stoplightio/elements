import { safeParse } from '@stoplight/json';
import { Button, CodeEditor, FileInput, Radio, RadioGroup } from '@stoplight/ui-kit';
import cn from 'classnames';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import * as typeis from 'type-is';
import { useRequestMakerStore } from '../../../hooks/useRequestMaker';
import { createContentTypeSuggestion, SuggestionFunc } from '../../../hooks/useSuggestion';
import { RequestMakerStore } from '../../../stores/request-maker';
import { SuggestionBar } from '../SuggestionBar';
import { RequestParameters } from './Parameters';

interface IRequestBody {
  className?: string;
}

export const RequestBody = observer<IRequestBody>(({ className }) => {
  const request = useRequestMakerStore('request');

  const onChange = React.useCallback(
    e => {
      request.contentType = e.currentTarget.value;
    },
    [request],
  );

  let content = <div className="text-center p-10 text-gray-6 flex-1">This request does not have a body</div>;

  if (request.contentType === 'raw') {
    content = (
      <div className="RequestMaker__RequestBody--raw flex flex-1">
        <CodeEditor
          className="m-5 flex-1"
          language="json"
          value={request.body}
          onChange={value => {
            request.body = value;
          }}
          padding={0}
          showLineNumbers
        />
      </div>
    );
  } else if (request.contentType === 'binary') {
    content = (
      <div className="RequestMaker__RequestBody--binary mx-5 my-3 flex-1">
        <FileInput
          text={request.formDataParams.length ? request.formDataParams[0].name : 'Choose file...'}
          onInputChange={e => {
            const files = e.currentTarget.files;
            if (files && files.length) {
              const formDataParams = [];
              // tslint:disable-next-line: prefer-for-of
              for (let i = 0; i < files.length; i++) {
                formDataParams.push({
                  name: files[i].name,
                  value: files[i],
                  type: files[i].type,
                  isEnabled: true,
                });
              }

              request.formDataParams = formDataParams;
            } else {
              request.formDataParams = [];
            }
          }}
          inputProps={{
            multiple: true,
          }}
        />
      </div>
    );
  } else if (request.contentType === 'graphql') {
    content = (
      <div className="RequestMaker__RequestBody--graphql flex flex-1">
        <div className="flex-1">
          <div className="px-3 pt-3 bp3-text-muted text-sm text-right">QUERY</div>
          <CodeEditor
            className="m-5"
            language="graphql"
            value={request.graphqlQuery}
            onChange={action((value: string) => {
              request.graphqlQuery = value;
            })}
            padding={0}
            showLineNumbers
          />
        </div>

        <div className="border-l" />

        <div className="flex-1">
          <div className="px-3 pt-3 bp3-text-muted text-sm text-right">VARIABLES</div>
          <CodeEditor
            className="m-5"
            language="json"
            value={request.graphqlVariables}
            onChange={action((value: string) => {
              request.graphqlVariables = value;
            })}
            padding={0}
            showLineNumbers
          />
        </div>
      </div>
    );
  } else if (request.contentType === 'form-data') {
    content = <RequestParameters className="flex-1" type="formData" />;
  } else if (request.contentType === 'x-www-form-urlencoded') {
    content = <RequestParameters className="flex-1" type="urlEncoded" />;
  }

  return (
    <div className={cn('RequestMaker__RequestBody flex flex-col', className)}>
      <RadioGroup
        className="RequestMaker__RequestBody--type mx-5 mt-3"
        inline
        onChange={onChange}
        selectedValue={request.contentType}
      >
        <Radio label="none" value="none" />
        <Radio label="raw" value="raw" />
        <Radio label="x-www-form-urlencoded" value="x-www-form-urlencoded" />
        <Radio label="form-data" value="form-data" />
        <Radio label="binary" value="binary" />
        <Radio label="graphql" value="graphql" />
      </RadioGroup>
      <SuggestionBar suggestions={suggestions} />
      <div
        className={`RequestMaker__RequestBody--content RequestMaker__RequestBody--${request.contentType} flex flex-1 border-t`}
      >
        {content}
      </div>
    </div>
  );
});

RequestBody.displayName = 'RequestMaker.RequestBody';

const suggestions: Array<SuggestionFunc<RequestMakerStore>> = [
  store => {
    if (store.request.contentType !== 'none' || !store.request.activeContentTypeHeader) {
      return undefined;
    }

    const resolution = () => {
      store.request.disableAllContentTypeHeaders();
    };

    return (
      <div className="flex items-center">
        A request with no body should not have a <em>Content-Type</em> header set.
        <Button minimal intent="primary" className="ml-2" rightIcon="tick" onClick={resolution}>
          Disable <em>Content-Type</em> headers.
        </Button>
      </div>
    );
  },

  createContentTypeSuggestion(
    store => {
      const requestStore = store.request;
      if (requestStore.contentType !== 'raw') {
        // this suggestion only applies in raw mode
        return false;
      }

      const currentContentType = requestStore.activeContentTypeHeader;
      const parsedBody = safeParse(requestStore.body);

      if (!parsedBody || !(typeof parsedBody === 'object')) {
        return false;
      }

      if (
        !currentContentType ||
        !currentContentType.value ||
        !typeis.is(currentContentType.value, ['application/json', 'application/*+json'])
      ) {
        return true;
      }
      return false;
    },
    'application/json',
    resolution => (
      <div className="flex items-center">
        Content is a valid JSON object, but the Content-Type header is not set.
        <Button minimal intent="primary" className="ml-2" rightIcon="tick" onClick={resolution}>
          Set <em>Content-Type: application/json</em>
        </Button>
      </div>
    ),
  ),

  createContentTypeSuggestion(
    store => {
      if (store.request.contentType !== 'x-www-form-urlencoded') {
        return false;
      }

      return store.request.activeContentTypeHeader?.value !== 'application/x-www-form-urlencoded';
    },
    'application/x-www-form-urlencoded',
    resolution => (
      <div className="flex items-center">
        Content-Type header is not set to 'application/x-www-form-urlencoded'.
        <Button minimal intent="primary" className="ml-2" rightIcon="tick" onClick={resolution}>
          Set <em>Content-Type</em> header
        </Button>
      </div>
    ),
  ),

  createContentTypeSuggestion(
    store => {
      if (store.request.contentType !== 'form-data') {
        return false;
      }

      return store.request.activeContentTypeHeader?.value !== 'multipart/form-data';
    },
    'multipart/form-data',
    resolution => (
      <div className="flex items-center">
        Content-Type header is not set to 'multipart/form-data'.
        <Button minimal intent="primary" className="ml-2" rightIcon="tick" onClick={resolution}>
          Set <em>Content-Type</em> header
        </Button>
      </div>
    ),
  ),
];
