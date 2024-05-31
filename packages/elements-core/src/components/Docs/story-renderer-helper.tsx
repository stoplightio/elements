import { isPlainObject } from '@stoplight/json';
import { isRegularNode } from '@stoplight/json-schema-tree';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { Box } from '@stoplight/mosaic';
import * as React from 'react';

import { ElementsOptionsProvider } from '../../context/Options';
import { ExtensionAddonRenderer, ExtensionRowProps } from './Docs';

/**
 * Renders the known x-enum-Description vendor extension
 * @returns React.ReactElement
 */
// eslint-disable-next-line storybook/prefer-pascal-case
export const renderExtensionRenderer: ExtensionAddonRenderer = (props: ExtensionRowProps) => {
  const { nestingLevel, schemaNode, vendorExtensions } = props;
  const { 'x-enum-descriptions': enumDescriptions = {} } = vendorExtensions;

  // If the nesting level is 0, we are at the root of the schema and should not render anything
  if (nestingLevel === 0) {
    return null;
  }

  // This implementation of the extension renderer only supports the `x-enum-descriptions`-extension
  if ('x-enum-descriptions' in vendorExtensions && isRegularNode(schemaNode) && isPlainObject(enumDescriptions)) {
    let value = `| Enum value | Description |\n|---|---|\n`;

    for (const enumValue of schemaNode.enum ?? []) {
      const description = enumDescriptions[String(enumValue)];
      value += `| ${enumValue} | ${description} |\n`;
    }

    return (
      <Box mb={2}>
        <Box
          mt={2}
          as={MarkdownViewer}
          markdown={value}
          style={{
            fontSize: 12,
          }}
        />
      </Box>
    );
  }

  return null;
};

/**
 * @private
 * Helper function to wrap the options context for the Docs subcomponents
 */
export const wrapOptionsContext = (story: any) => {
  return <ElementsOptionsProvider renderExtensionAddon={renderExtensionRenderer}>{story}</ElementsOptionsProvider>;
};
