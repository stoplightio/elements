import { CustomComponentMapping } from '@stoplight/markdown-viewer';
import { dirname, resolve } from '@stoplight/path';
import React from 'react';
import URI from 'urijs';

import { BundledBranchNode, IntegrationKind } from '../../../types';

export const createResolvedImageComponent = (branchNode: BundledBranchNode) => {
  const ResolvedImage: CustomComponentMapping['img'] = ({ title, alt, src }) => {
    return <img src={resolveImageUrlHandler(src || '', branchNode)} title={title} alt={alt} />;
  };
  return React.memo(ResolvedImage);
};

const resolveImageUrlHandler = (url: string, branchNode: BundledBranchNode) => {
  // don't touch absolute urls no matter which service we're using
  if (URI(url).is('absolute')) {
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
      imageUri = new URI(branchNode.workspaceIntegration.hostUrl || '');
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
      imageUri = new URI((branchNode.workspaceIntegration.apiUrl || '').replace(/\/rest\/api\/[0-9.]+/, ''));
      imageUri.segmentCoded([...imageUri.segmentCoded(), 'projects', orgSlug, 'repos', projectSlug || '', 'browse']);
      imageUri.segment([...imageUri.segment(), resolvedUri]).query({ raw: '' });
      break;

    case IntegrationKind.BitbucketCloud:
      imageUri = new URI(branchNode.workspaceIntegration.hostUrl || '');
      imageUri.segmentCoded([...imageUri.segmentCoded(), orgSlug, projectSlug, 'raw', branchSlug]);
      imageUri.segment([...imageUri.segment(), resolvedUri]);
      break;

    case IntegrationKind.Github:
      imageUri = new URI(branchNode.workspaceIntegration.hostUrl || '');
      imageUri.hostname(`raw.${imageUri.hostname()}`);
      imageUri.segmentCoded([...imageUri.segmentCoded(), orgSlug, projectSlug, branchSlug]);
      imageUri.segment([...imageUri.segment(), resolvedUri]);
      // if image is svg sanitize true
      if (RegExp(/\.svg$/).test(imageUri.path())) {
        imageUri.setQuery({ sanitize: true });
      }
      break;

    case IntegrationKind.Gitlab:
      imageUri = new URI(branchNode.workspaceIntegration.hostUrl || '');
      imageUri.segmentCoded([...imageUri.segmentCoded(), orgSlug, projectSlug, 'raw', branchSlug]);
      imageUri.segment([...imageUri.segment(), resolvedUri]);
      break;

    case IntegrationKind.Gitea:
      imageUri = new URI(branchNode.workspaceIntegration.hostUrl || '');
      imageUri.segmentCoded([...imageUri.segmentCoded(), orgSlug, projectSlug, 'raw', 'branch', branchSlug]);
      imageUri.segment([...imageUri.segment(), resolvedUri]);
      break;

    default:
      imageUri = new URI(resolvedUri);
  }

  return imageUri.normalize().valueOf();
};
