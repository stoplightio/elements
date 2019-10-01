import 'resize-observer-polyfill';

import { IconName, Intent, Popover, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import useComponentSize from '@rehooks/component-size';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import {
  BlockHeader,
  CLASSNAMES,
  ICodeAnnotations,
  IComponentMappingProps,
  MarkdownViewer,
} from '@stoplight/markdown-viewer';
import { NodeType } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';
import { ComponentsContext } from '../containers/Provider';
import { useComputePageToc } from '../hooks/useComputePageToc';
import { useResolver } from '../hooks/useResolver';
import { buildNodeMarkdownTree } from '../utils/node';
import { HttpOperation } from './HttpOperation';
import { HttpRequest } from './HttpRequest';
import { HttpService } from './HttpService';
import { PageToc } from './PageToc';

export interface IDocs {
  type: NodeType | 'json_schema' | 'http';
  data: unknown;
  padding?: string;
}

export const Docs: React.FunctionComponent<IDocs> = ({ type, data, padding }) => {
  const components = useComponents();
  const pageDocsRef = React.useRef<HTMLDivElement | null>(null);
  const { width } = useComponentSize(pageDocsRef);
  const showPageToc = width >= 1000;

  const tree = buildNodeMarkdownTree(type, data);
  const headings = useComputePageToc(tree);

  return (
    <div className="Page__docs flex w-full" ref={pageDocsRef}>
      <MarkdownViewer className={`Page__content flex-1 p-${padding}`} markdown={tree} components={components} />

      <PageToc className="Page__toc" padding={padding} headings={headings} minimal={!showPageToc} />
    </div>
  );
};

const JSV_MAX_ROWS = 50;
const MarkdownViewerCode: React.FunctionComponent<{
  type: NodeType | 'json_schema' | 'http';
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
                  className={cn('p-6 max-w-md break-all', {
                    'list-none': errors.length === 1,
                  })}
                >
                  {errors.map((error, index) => {
                    return (
                      <li key={index} className={index > 1 ? 'mt-3' : ''}>
                        {error && error.uri ? (
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
  } else if (type === 'http') {
    return <HttpRequest className="my-10" request={result} />;
  }

  return null;
};

function useComponents() {
  const Components = React.useContext(ComponentsContext);

  return React.useMemo(() => {
    return {
      ...Components,

      code: (props: IComponentMappingProps<any>, key: React.Key) => {
        const { node, defaultComponents, parent } = props;

        const nodeType = node.annotations && node.annotations.type ? node.annotations.type : node.meta;

        if (['json_schema', 'http', NodeType.Model, NodeType.HttpOperation, NodeType.HttpService].includes(nodeType)) {
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
