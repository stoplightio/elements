import { faBullseye, faCloud, faCube, faCubes, faEnvelope, faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons';
import { IIconProps, ITextColorProps } from '@stoplight/mosaic';
import { HttpMethod } from '@stoplight/types';

// Icons appear left of the node title
export const NODE_TYPE_TITLE_ICON: Readonly<{ [nodeType: string]: IIconProps['icon'] }> = {
  http_service: faCloud,
  http_operation: faBullseye,
  http_webhook: faEnvelope,
  model: faCube,
};

export const NODE_GROUP_ICON: Readonly<{ [itemType: string]: IIconProps['icon'] }> = {
  http_webhook: faEnvelopesBulk,
  model: faCubes,
};

// Icons appear in the right meta
export const NODE_TYPE_META_ICON: Readonly<{ [nodeType: string]: IIconProps['icon'] }> = {
  webhook: faEnvelope,
  model: faCube,
};

export const NODE_TYPE_ICON_COLOR: Readonly<{ [nodeType: string]: ITextColorProps['color'] }> = {
  model: 'warning',
  http_service: '#D812EA' as ITextColorProps['color'],
  http_operation: '#9747FF' as ITextColorProps['color'],
  http_webhook: 'primary',
};

export const NODE_GROUP_ICON_COLOR: Readonly<{ [nodeType: string]: ITextColorProps['color'] }> = {
  http_webhook: 'primary',
  model: 'warning',
};

export const NODE_META_COLOR: Readonly<Record<HttpMethod, string>> = {
  get: 'success',
  post: 'primary',
  put: 'warning',
  patch: 'warning',
  delete: 'danger',
  head: '#9061F9',
  options: '#0D5AA7',
  trace: '#0D0B28',
};
