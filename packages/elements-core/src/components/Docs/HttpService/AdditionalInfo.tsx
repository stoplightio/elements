import { Panel } from '@stoplight/mosaic';
import { IHttpService } from '@stoplight/types';
import React from 'react';

import { MarkdownViewer } from '../../MarkdownViewer';

const spdxLicenseList = require('spdx-license-list');

interface AdditionalInfoProps {
  termsOfService?: string;
  contact?: IHttpService['contact'];
  license?: IHttpService['license'];
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ termsOfService, contact, license }) => {
  const contactLink =
    contact?.name && contact?.url
      ? `[Contact ${contact.name}](${contact.url})`
      : contact?.email
      ? `[Contact ${contact.name || contact.email}](mailto:${contact.email})`
      : '';

  //use spdx to look up url for license identifier if available
  const licenseUrl =
    license?.url || (spdxLicenseList[`${license?.identifier}`] && spdxLicenseList[`${license?.identifier}`].url);

  const licenseLink = license?.name && licenseUrl ? `[License: ${license.name}](${licenseUrl})` : '';
  const tosLink = termsOfService ? `[Terms of Service](${termsOfService})` : '';
  return (
    <>
      {contactLink || licenseLink || tosLink ? (
        <Panel rounded isCollapsible={false}>
          <Panel.Titlebar bg="canvas-300">
            <span role="heading">Additional Information</span>
          </Panel.Titlebar>
          <Panel.Content p={0}>
            <Panel.Content>
              <MarkdownViewer style={{ fontSize: 12 }} markdown={`${contactLink}\n \n${licenseLink}\n \n ${tosLink}`} />
            </Panel.Content>
          </Panel.Content>
        </Panel>
      ) : null}
    </>
  );
};
