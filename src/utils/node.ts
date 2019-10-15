import { Dictionary, NodeType } from '@stoplight/types';
import { IconName } from '@stoplight/ui-kit';
import { last, split, upperFirst } from 'lodash';

export const NodeTypeColors: Dictionary<string, NodeType> = {
  http_operation: '#6a6acb',
  http_service: '#e056fd',
  article: '#399da6',
  model: '#ef932b',
  http_server: '',
  unknown: '',
};

export const NodeTypePrettyName: Dictionary<string, NodeType> = {
  http_operation: 'Endpoint',
  http_service: 'API',
  article: 'Article',
  model: 'Model',
  http_server: 'Server',
  unknown: '',
};

export const NodeTypeIcons: Dictionary<IconName, NodeType> = {
  http_operation: 'locate',
  http_service: 'cloud',
  article: 'manual',
  model: 'cube',
  http_server: 'database',
  unknown: 'help',
};

export function getNodeTitle(srn: string, data?: any) {
  let title = '';

  if (data && data.title) {
    title = data.title;
  } else {
    title = upperFirst(last(split(srn, '/')));
  }

  return title;
}
