import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { Box, Icon, InvertTheme, NodeAnnotation, Panel, Text, Tooltip, useClipboard, VStack } from '@stoplight/mosaic';
import type { INodeVariable, IServer } from '@stoplight/types';
import { JSONSchema7 } from 'json-schema';
import { isEmpty, isNil, omitBy } from 'lodash';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { useOptionsCtx } from '../../../context/Options';
import { isProperUrl } from '../../../utils/guards';
import { getServersToDisplay } from '../../../utils/http-spec/IServer';

interface ServerInfoProps {
  servers: IServer[];
  mockUrl?: string;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({ servers, mockUrl }) => {
  const mocking = React.useContext(MockingContext);
  const showMocking = !mocking.hideMocking && mockUrl && isProperUrl(mockUrl);
  const $mockUrl = showMocking ? mockUrl || mocking.mockUrl : undefined;

  const serversToDisplay = React.useMemo(() => getServersToDisplay(servers, $mockUrl, false), [servers, $mockUrl]);

  const hasAnyServerVariables = React.useMemo(
    () => serversToDisplay.some(server => !isEmpty(server.variables)),
    [serversToDisplay],
  );

  if (!showMocking && serversToDisplay.length === 0) {
    return null;
  }

  return (
    <InvertTheme>
      <Panel rounded isCollapsible={false} className="BaseURLContent" w="full">
        <Panel.Titlebar whitespace="nowrap">API Base URL</Panel.Titlebar>
        <Panel.Content w="full" className="sl-flex sl-flex-col">
          <VStack spacing={1} divider>
            {serversToDisplay.map((server, index) => (
              <ServerUrl {...server} hasAnyServerVariables={hasAnyServerVariables} key={server.id} />
            ))}
          </VStack>
        </Panel.Content>
      </Panel>
    </InvertTheme>
  );
};

const ServerUrl: React.FC<IServer & { hasAnyServerVariables: boolean }> = ({
  id,
  description,
  url,
  variables,
  hasAnyServerVariables,
}) => {
  const { nodeHasChanged } = useOptionsCtx();
  const { onCopy, hasCopied } = useClipboard(url);
  const urlFragments = useSplitUrl(url);
  const hasChanged = nodeHasChanged?.({ nodeId: id });
  const variablesSchema = useVariablesJSONSchema(variables);
  const titlePaddingLeft = hasAnyServerVariables && !variablesSchema ? 4 : 0;

  return (
    <Panel isCollapsible={!!variablesSchema} w="full">
      <Panel.Titlebar whitespace="nowrap">
        <Text pl={titlePaddingLeft} pr={2} fontWeight="bold">
          {description}:
        </Text>

        <Tooltip
          placement="right"
          renderTrigger={() => (
            <Text aria-label={description}>
              {urlFragments.map(({ kind, value }, i) => (
                <Text key={i} fontWeight={kind === 'variable' ? 'semibold' : 'normal'}>
                  {value}
                </Text>
              ))}
            </Text>
          )}
        >
          {!hasCopied && (
            <Box p={1} onClick={onCopy} cursor="pointer">
              Copy Server URL <Icon className="sl-ml-1" icon={['fas', 'copy']} />
            </Box>
          )}
          {hasCopied && (
            <Box p={1}>
              Copied Server URL <Icon className="sl-ml-1" icon={['fas', 'check']} />
            </Box>
          )}
        </Tooltip>

        <NodeAnnotation change={hasChanged} additionalLeftOffset={16} />
      </Panel.Titlebar>
      {variablesSchema && (
        <Panel.Content w="full">
          <Box pl={4}>
            <JsonSchemaViewer schema={variablesSchema} />
          </Box>
        </Panel.Content>
      )}
    </Panel>
  );
};

function useVariablesJSONSchema(variables: Record<string, INodeVariable> | undefined): JSONSchema7 | undefined {
  return React.useMemo(() => {
    if (isEmpty(variables)) return;

    const propertiesPairs = Object.entries(variables).map(([name, variable]) => [
      name,
      {
        type: 'string',
        ...omitBy(
          // this is to ensure the consistent order in case http-spec changes it etc.
          {
            description: variable.description,
            enum: variable.enum,
            default: variable.default,
          },
          isNil,
        ),
      },
    ]);

    return {
      type: 'object',
      properties: Object.fromEntries(propertiesPairs),
    };
  }, [variables]);
}

export function useSplitUrl(url: string) {
  return React.useMemo(() => {
    const regExp = /\{[^}]+}/g;
    const fragments: { kind: 'variable' | 'static'; value: string }[] = [];

    let index = 0;
    let match;

    while ((match = regExp.exec(url))) {
      const variable = match[0];

      if (match.index !== index) {
        fragments.push({
          kind: 'static',
          value: url.slice(index, match.index),
        });
      }

      fragments.push({
        kind: 'variable',
        value: variable,
      });

      index = regExp.lastIndex;
    }

    if (index !== url.length) {
      fragments.push({
        kind: 'static',
        value: url.slice(index),
      });
    }

    return fragments;
  }, [url]);
}
