import { INode } from '@stoplight/types';
import type { JSONSchema7 } from 'json-schema';
import { memoize } from 'lodash';
import * as React from 'react';

import { useOptionsCtx } from '../../context/Options';
import { getOriginalObject } from '../../utils/ref-resolving/resolvedObject';

export type NodeVendorExtensionsProps = {
  /**
   * The input data for the component to display.
   */
  data: INode | JSONSchema7;
};

function getVendorExtensionsValue(currentValue: string, data: object) {
  if (currentValue in data) {
    return data[currentValue as keyof typeof data];
  } else {
    return undefined;
  }
}

/**
 * @private
 * Resolves the vendor extensions from the given object,
 * covers the case where the given data is not a INode which has already parsed
 * the vendor extensions into the `extensions` property.
 *
 * @param data The object to extract the vendor extensions from.
 */
const getVendorExtensions = memoize((data: object) => {
  const vendorExtensionNames = Object.keys(data).filter(item => item.startsWith('x-'));
  const vendorExtensions = vendorExtensionNames.reduce((previousValue, currentValue, currentIndex: number) => {
    return {
      ...previousValue,
      [currentValue]: getVendorExtensionsValue(currentValue, data),
    };
  }, {});
  return vendorExtensions;
});

/**
 * @private
 * Renders the vendor extensions for a content node
 */
export const NodeVendorExtensions = React.memo<NodeVendorExtensionsProps>(({ data }) => {
  const { renderExtensionAddon } = useOptionsCtx();

  if (!renderExtensionAddon) {
    return null;
  }

  const originalObject = getOriginalObject(data) as INode;
  const vendorExtensions = originalObject.extensions ? originalObject.extensions : getVendorExtensions(originalObject);
  const vendorExtensionKeys = Object.keys(vendorExtensions);
  if (vendorExtensionKeys.length === 0) {
    return null;
  }
  return (
    <>
      {renderExtensionAddon({
        // Use nestingLevel -1 to represent the root node of the document
        nestingLevel: -1,
        schemaNode: originalObject as any,
        vendorExtensions,
      })}
    </>
  );
});
NodeVendorExtensions.displayName = 'NodeVendorExtensions';
