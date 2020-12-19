import { Button, Checkbox, InputGroup } from '@stoplight/ui-kit';
import { Suggest } from '@stoplight/ui-kit/Select';
import cn from 'classnames';
import { get, map } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMakerStore';
import { IParam, ParamField, ParamType } from '../../../stores/request-maker/types';

type InFocus = {
  prop: string;
  index: number;
};

type PropChangeHandler = <T extends keyof IParam>(prop: T, index: number, value: IParam[T]) => void;

interface ISuggestRendererOptions {
  name: string;
  key: string;
  params: IParam[];
  index: number;
  inFocus: InFocus;
  setInFocus: (val: InFocus) => void;
  handlerPropChange: PropChangeHandler;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}
export interface IRequestParameters {
  type: ParamType;
  className?: string;
  suggestRenderer?: (options: ISuggestRendererOptions) => React.ReactElement<Suggest<ParamField>>;
}

export const RequestParameters = observer<IRequestParameters>(({ type, className, suggestRenderer }) => {
  const [inFocus, setInFocus] = React.useState({ prop: 'name', index: -1 });
  const requestStore = useRequestMakerStore('request');
  const parameters: IParam[] = requestStore[`${type}Params`];
  const operationKey = `${requestStore.method}:${requestStore.url}`;

  const handlerPropChange: PropChangeHandler = React.useCallback(
    (prop, index, value) => {
      requestStore.setParam(type, index, prop, value);
    },
    [requestStore, type],
  );

  const handleRemoveParam = React.useCallback(
    (index: number) => {
      requestStore.removeParam(type, index);
    },
    [requestStore, type],
  );

  const handleAddParam = React.useCallback(
    ({ key = '', value = '', enabled = true }) => {
      requestStore.addParam(type, key, value, enabled);
    },
    [requestStore, type],
  );

  const checkParam = React.useCallback(
    (param: IParam, index: number) => {
      if (param.name === '' && param.value === '') {
        handleRemoveParam(index);
      }
    },
    [handleRemoveParam],
  );

  return (
    <div className={cn('RequestMaker__RequestParameters', className)}>
      {map(parameters, (param, index) => {
        return (
          <div key={`param-row-${index}`} className="flex border-b RequestMaker__RequestParameters-row group">
            <div className="flex items-center justify-center pr-4 border-r">
              <Checkbox
                alignIndicator="right"
                className="mb-0"
                checked={param.isEnabled}
                onChange={() => {
                  handlerPropChange('isEnabled', index, !param.isEnabled);
                }}
              />
            </div>

            <div className="flex-1 border-r">
              {suggestRenderer ? (
                suggestRenderer({
                  name: param.name,
                  key: operationKey,
                  params: parameters,
                  index,
                  inFocus,
                  setInFocus,
                  handlerPropChange,
                  onBlur: () => checkParam(param, index),
                })
              ) : (
                <InputGroup
                  autoFocus={inFocus.index === index && inFocus.prop === 'name'}
                  className="w-full h-full"
                  type="text"
                  onChange={(event: any) => handlerPropChange('name', index, event.currentTarget.value)}
                  onBlur={() => checkParam(param, index)}
                  placeholder="Key"
                  value={param.name || ''}
                />
              )}
            </div>

            <div className="flex-1 border-r">
              <InputGroup
                autoFocus={inFocus.index === index && inFocus.prop === 'value'}
                className="w-full h-full"
                type="text"
                onChange={(event: any) => handlerPropChange('value', index, event.currentTarget.value)}
                onBlur={() => checkParam(param, index)}
                placeholder={get(param, 'schema.description') || 'Value'}
                value={param.value || ''}
              />
            </div>

            <div className="flex items-center justify-center px-2">
              <Button
                className="invisible group-hover:visible"
                tabIndex={-1}
                minimal
                small
                icon="cross"
                onClick={() => handleRemoveParam(index)}
              />
            </div>
          </div>
        );
      })}

      <div className="flex RequestMaker__RequestParameters-placeholder">
        <div className="flex items-center justify-center pr-4 border-r">
          <Checkbox alignIndicator="right" className="invisible mb-0" />
        </div>

        <div className="flex-1 border-r">
          <InputGroup
            className="w-full h-full"
            type="text"
            onFocus={event => {
              handleAddParam({ key: event.currentTarget.value });
              setInFocus({
                prop: 'name',
                index: requestStore[`${type}Params`].length - 1,
              });
            }}
            onChange={() => null}
            placeholder="Key"
            value=""
          />
        </div>

        <div className="flex-1 border-r">
          <InputGroup
            className="w-full h-full"
            type="text"
            onFocus={event => {
              handleAddParam({ value: event.currentTarget.value });
              setInFocus({
                prop: 'value',
                index: requestStore[`${type}Params`].length - 1,
              });
            }}
            onChange={() => null}
            placeholder="Value"
            value=""
          />
        </div>

        <div className="flex items-center justify-center px-2">
          <Button className="invisible" tabIndex={-1} minimal small icon="cross" />
        </div>
      </div>
    </div>
  );
});

RequestParameters.displayName = 'RequestMaker.RequestParameters';
