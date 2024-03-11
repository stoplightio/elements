import { ExtensionAddonRenderer } from '@stoplight/json-schema-viewer';
import { INode } from '@stoplight/types';
import * as React from 'react';

import { getOriginalObject } from '../../utils/ref-resolving/resolvedObject';

export type INodeVendorExtensionsProps = {
  data: INode;
  renderExtensionAddon?: ExtensionAddonRenderer;
};

/**
 * @private
 * @param data
 * @returns
 */
function getVendorExtensions(data: object) {
  const vendorExtensionNames = Object.keys(data).filter(item => item.startsWith('x-'));
  const vendorExtensions = vendorExtensionNames.reduce((previousValue, currentValue, currentIndex: number) => {
    return {
      ...previousValue,
      [currentValue]: data[currentValue],
    };
  }, {});
  return vendorExtensions;
}

export const NodeVendorExtensions: React.FC<INodeVendorExtensionsProps> = ({
  data,
  renderExtensionAddon,
}: INodeVendorExtensionsProps) => {
  if (!renderExtensionAddon) {
    return null;
  }

  // Get the original referenced object (e.g. without Proxy)
  const originalObject = getOriginalObject(data) as INode;
  const nodeExtensions = originalObject.extensions ? originalObject.extensions : getVendorExtensions(originalObject);
  return (
    <>
      {renderExtensionAddon({
        nestingLevel: -1,
        schemaNode: originalObject as any,
        vendorExtensions: nodeExtensions,
      })}
    </>
  );
};
