import { CustomComponentMapping } from '@stoplight/markdown-viewer';
import { dirname, isAbsolute, resolve } from '@stoplight/path';
import * as React from 'react';

import { BundledBranchNode, IntegrationKind } from '../../../types';
import { ExtendedURL } from '../../../utils/url';

export const createResolvedImageComponent = (branchNode: BundledBranchNode) => {
  const ResolvedImage: CustomComponentMapping['img'] = ({ title, alt, src }) => {
    return <img src={resolveImageUrlHandler(src || '', branchNode)} title={title} alt={alt} />;
  };
  return React.memo(ResolvedImage);
};

const resolveImageUrlHandler = (url: string, branchNode: BundledBranchNode) => {
  // don't touch absolute urls no matter which service we're using
  if (isAbsolute(url)) {
    return url;
  }

  const orgSlug = branchNode.externalOrgSlug;
  const projectSlug = branchNode.externalSlug;
  const branchSlug = branchNode.branchSlug;
  const uri = branchNode.uri;

  if (!orgSlug || !projectSlug || !branchNode.workspaceIntegration.kind) {
    return url;
  }

  const resolvedUri = resolve(dirname(uri || ''), url);

  let imageUri;
  switch (branchNode.workspaceIntegration.kind) {
    case IntegrationKind.AzureDevopsServer:
      imageUri = new ExtendedURL(branchNode.workspaceIntegration.hostUrl || '');
      imageUri
        .segmentCoded([...imageUri.segmentCoded(), orgSlug, '_apis', 'git', 'repositories', projectSlug, 'items'])
        .query({
          scopePath: resolvedUri,
          'api-version': '4.1',
          $format: 'OctetStream',
        });
      break;

    case IntegrationKind.BitbucketServer:
      // need to remove the api path
      imageUri = new ExtendedURL((branchNode.workspaceIntegration.apiUrl || '').replace(/\/rest\/api\/[0-9.]+/, ''));
      imageUri.segmentCoded([...imageUri.segmentCoded(), 'projects', orgSlug, 'repos', projectSlug || '', 'browse']);
      imageUri.segment([...imageUri.segment(), resolvedUri]).query({ raw: '' });
      break;

    case IntegrationKind.BitbucketCloud:
      imageUri = new ExtendedURL(branchNode.workspaceIntegration.hostUrl || '');
      imageUri.segmentCoded([...imageUri.segmentCoded(), orgSlug, projectSlug, 'raw', branchSlug]);
      imageUri.segment([...imageUri.segment(), resolvedUri]);
      break;

    case IntegrationKind.Github:
      imageUri = new ExtendedURL(branchNode.workspaceIntegration.hostUrl || '');
      imageUri.hostname = `raw.${imageUri.hostname}`;
      imageUri.segmentCoded([...imageUri.segmentCoded(), orgSlug, projectSlug, branchSlug]);
      imageUri.segment([...imageUri.segment(), resolvedUri]);
      // if image is svg sanitize true
      if (RegExp(/\.svg$/).test(imageUri.pathname)) {
        imageUri.searchParams.set('sanitize', 'true');
      }
      break;

    case IntegrationKind.Gitlab:
      imageUri = new ExtendedURL(branchNode.workspaceIntegration.hostUrl || '');
      imageUri.segmentCoded([...imageUri.segmentCoded(), orgSlug, projectSlug, 'raw', branchSlug]);
      imageUri.segment([...imageUri.segment(), resolvedUri]);
      break;

    case IntegrationKind.Gitea:
      imageUri = new ExtendedURL(branchNode.workspaceIntegration.hostUrl || '');
      imageUri.segmentCoded([...imageUri.segmentCoded(), orgSlug, projectSlug, 'raw', 'branch', branchSlug]);
      imageUri.segment([...imageUri.segment(), resolvedUri]);
      break;

    default:
      imageUri = new ExtendedURL(resolvedUri);
  }

  return String(imageUri);
};
