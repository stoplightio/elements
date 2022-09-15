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
  const licenseUrl = license?.url || `https://spdx.org/licenses/${license?.identifier}.html`;
  const licenseLink = license?.name && licenseUrl ? `[${license.name} License](${licenseUrl})` : '';
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
