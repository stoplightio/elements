import { faBullseye, faCloud, faCube, faCubes, faEnvelope, faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons';
import { IIconProps } from '@stoplight/mosaic';
import { Dictionary, HttpMethod, NodeType } from '@stoplight/types';

// Icons appear left of the node title
export const NODE_TYPE_TITLE_ICON: { [nodeType: string]: IIconProps['icon'] } = {
  http_service: faCloud,
  http_operation: faBullseye,
  http_webhook: faEnvelope,
  model: faCube,
};

export const NODE_GROUP_ICON: { [itemType: string]: IIconProps['icon'] } = {
  http_webhook: faEnvelopesBulk,
  model: faCubes,
};

// Icons appear in the right meta
export const NODE_TYPE_META_ICON: { [nodeType: string]: IIconProps['icon'] } = {
  webhook: faEnvelope,
  model: faCube,
};

export const NODE_TYPE_ICON_COLOR: Partial<Dictionary<string, NodeType>> = {
  model: 'warning',
  http_service: '#D812EA',
  http_operation: '#9747FF',
  http_webhook: 'primary',
};

export const NODE_GROUP_ICON_COLOR: Partial<Dictionary<string, NodeType>> = {
  http_webhook: 'primary',
  model: 'warning',
};

export const NODE_META_COLOR: Record<HttpMethod, string> = {
  get: 'success',
  post: 'primary',
  put: 'warning',
  patch: 'warning',
  delete: 'danger',
  head: '#9061F9',
  options: '#0D5AA7',
  trace: '#0D0B28',
};
