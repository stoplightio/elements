import { faBullseye, faCloud, faCube, faCubes } from '@fortawesome/free-solid-svg-icons';
import { IIconProps } from '@stoplight/mosaic';

// Icons appear left of the node title
export const NODE_TYPE_TITLE_ICON: { [nodeType: string]: IIconProps['icon'] } = {
  http_service: faCloud,
  http_operation: faBullseye,
  model: faCube,
};

export const NODE_TITLE_ICON: { [nodeTitle: string]: IIconProps['icon'] } = {
  Schemas: faCubes,
};

// Icons appear in the right meta
export const NODE_TYPE_META_ICON: { [nodeType: string]: IIconProps['icon'] } = {
  model: faCube,
};

export const NODE_TYPE_ICON_COLOR = {
  model: 'warning',
  http_service: '#D812EA',
  http_operation: '#9747FF',
};

export const NODE_TITLE_ICON_COLOR = {
  Schemas: 'warning',
};

export const NODE_META_COLOR = {
  get: 'success',
  post: 'primary',
  put: 'warning',
  patch: 'warning',
  delete: 'danger',
};
