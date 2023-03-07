import { faCloud, faCube } from '@fortawesome/free-solid-svg-icons';
import { IIconProps } from '@stoplight/mosaic';

// Icons appear left of the node title
export const NODE_TYPE_TITLE_ICON: { [nodeType: string]: IIconProps['icon'] } = {
  http_service: faCloud,
};

// Icons appear in the right meta
export const NODE_TYPE_META_ICON: { [nodeType: string]: IIconProps['icon'] } = {
  model: faCube,
};

export const NODE_TYPE_ICON_COLOR = {
  model: 'warning',
};

export const NODE_META_COLOR = {
  get: 'success',
  post: 'primary',
  put: 'warning',
  patch: 'warning',
  delete: 'danger',
};
