import { ElementsOptionsProvider } from '@stoplight/elements-core/context/Options';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import { Box } from '@stoplight/mosaic';
import * as React from 'react';

/**
 * Renders the known x-enum-Description vendor extension
 * @returns React.ReactElement
 */
// eslint-disable-next-line storybook/prefer-pascal-case
export const renderExtensionRenderer = (props: any) => {
  const { nestingLevel, schemaNode: node, vendorExtensions } = props;

  // If the nesting level is 0, we are at the root of the schema and should not render anything
  if (nestingLevel === 0) {
    return null;
  }

  // This implementation of the extension renderer only supports the `x-enum-descriptions`-extension
  if ('x-enum-descriptions' in vendorExtensions) {
    const { 'x-enum-descriptions': enumDescriptions = {} } = vendorExtensions;

    let value = `| Enum value | Description |\n|---|---|\n`;
    const enums = node.enum ?? [];
    enums.forEach((name: string) => {
      const description = enumDescriptions[name as string];
      value += `| ${name} | ${description} |\n`;
    });

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
