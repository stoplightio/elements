import { NodeAnnotation, Panel } from '@stoplight/mosaic';
import { IHttpService } from '@stoplight/types';
import React from 'react';

import { useOptionsCtx } from '../../../context/Options';
import { MarkdownViewer } from '../../MarkdownViewer';

interface AdditionalInfoProps {
  id: string;
  termsOfService?: string;
  contact?: IHttpService['contact'];
  license?: IHttpService['license'];
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ id, termsOfService, contact, license }) => {
  const { nodeHasChanged } = useOptionsCtx();
  const hasChanged = nodeHasChanged?.({ nodeId: id, attr: ['termsOfService', 'contact', 'license'] });

  const contactLink =
    contact?.name && contact?.url
      ? `[Contact ${contact.name}](${contact.url})`
      : contact?.email
      ? `[Contact ${contact.name || contact.email}](mailto:${contact.email})`
      : '';

  //use spdx to look up url for license identifier if available
  // The licenseUrl is determined based on the mutual exclusivity of the `url` and `identifier` fields.
  // If a `license.url` is provided, it takes precedence over the `license.identifier`.
  // This is because the OpenAPI specification defines `url` and `identifier` as mutually exclusive fields,
  // meaning you should use either one or the other, but not both. If both are provided, the `url` should be used.
  // See: https://spec.openapis.org/oas/latest.html#license-object
  const licenseUrl = license?.url
    ? license?.url
    : license?.identifier
    ? `https://spdx.org/licenses/${license?.identifier}.html`
    : undefined;

  const licenseLink =
    license?.name && licenseUrl
      ? `[${license.name}](${licenseUrl})`
      : license?.identifier && licenseUrl
      ? `[${license?.identifier}](${licenseUrl})`
      : '';
  const tosLink = termsOfService ? `[Terms of Service](${termsOfService})` : '';

  return contactLink || licenseLink || tosLink ? (
    <Panel rounded isCollapsible={false} pos="relative">
      <Panel.Titlebar bg="canvas-300">
        <span role="heading">Additional Information</span>
      </Panel.Titlebar>

      <Panel.Content p={0}>
        <Panel.Content>
          <MarkdownViewer style={{ fontSize: 12 }} markdown={`${contactLink}\n \n${licenseLink}\n \n ${tosLink}`} />
        </Panel.Content>
      </Panel.Content>

      <NodeAnnotation change={hasChanged} />
    </Panel>
  ) : null;
};
