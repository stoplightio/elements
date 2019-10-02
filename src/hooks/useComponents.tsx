import { IconName, Intent, Popover, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import {
  BlockHeader,
  CLASSNAMES,
  ICodeAnnotations,
  IComponentMapping,
  IComponentMappingProps,
} from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import { ScrollContainer } from '@stoplight/ui-kit/ScrollContainer';
import cn from 'classnames';
import * as React from 'react';
import { HttpOperation } from '../components/HttpOperation';
import { HttpService } from '../components/HttpService';
import { ComponentsContext } from '../containers/Provider';
import { useResolver } from './useResolver';

export function useComponents(): IComponentMapping {
  const Components = React.useContext(ComponentsContext);
  return React.useMemo(() => {
    return {
      ...Components,
      code: (props: IComponentMappingProps<any>, key: React.Key) => {
        const { node, defaultComponents, parent } = props;
        const nodeType = node.annotations && node.annotations.type ? node.annotations.type : node.meta;
        if (['json_schema', NodeType.Model, NodeType.HttpOperation, NodeType.HttpService].includes(nodeType)) {
          return (
            <MarkdownViewerCode
              key={key}
              type={nodeType}
              value={node.value}
              annotations={node.annotations}
              parent={parent}
            />
          );
        }
        return Components && Components.code ? Components.code(props, key) : defaultComponents.code(props, key);
      },
    };
  }, [Components]);
}

const JSV_MAX_ROWS = 50;
const MarkdownViewerCode: React.FunctionComponent<{
  type: NodeType | 'json_schema';
  value: any;
  annotations: ICodeAnnotations;
  parent: IComponentMappingProps<any>['parent'];
}> = ({ type, value, annotations, parent }) => {
  const { result, errors } = useResolver(type, value);

  if (type === NodeType.Model || type === 'json_schema') {
    const title = annotations && annotations.title;
    const icon: IconName = 'cube';
    const color = '#ef932b';
    return (
      <div>
        {title && <BlockHeader icon={icon} iconColor={color} title={title} />}

        {errors.length > 0 && (
          <div className="w-full flex justify-end">
            <Popover
              interactionKind={PopoverInteractionKind.HOVER}
              target={
                <Tag intent={Intent.DANGER}>
                  {errors.length} Error{errors.length > 1 && 's'}
                </Tag>
              }
              content={
                <div
                  className={cn('break-all', {
                    'list-none': errors.length === 1,
                  })}
                  style={{ height: 300, width: 300 }}
                >
                  <ScrollContainer>
                    <div className="p-6">
                      {errors.map((error, index) => {
                        return (
                          <li key={index} className={index > 0 ? 'mt-3' : ''}>
                            {error && error.uri && String(error.uri) ? (
                              <>
                                Fail to resolve{' '}
                                <a href={String(error.uri)} target="_blank">
                                  {String(error.uri)}
                                </a>
                              </>
                            ) : (
                              error.message
                            )}
                          </li>
                        );
                      })}
                    </div>
                  </ScrollContainer>
                </div>
              }
            />
          </div>
        )}

        <div
          className={cn('dark:border-darken', {
            [CLASSNAMES.bordered]: !parent || parent.type !== 'tab',
            [CLASSNAMES.block]: !parent || parent.type !== 'tab',
          })}
        >
          <JsonSchemaViewer schema={result} maxRows={JSV_MAX_ROWS} />
        </div>
      </div>
    );
  } else if (type === NodeType.HttpOperation) {
    return <HttpOperation value={result} />;
  } else if (type === NodeType.HttpService) {
    return <HttpService value={result} />;
  }
  return null;
};
