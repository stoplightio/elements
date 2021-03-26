import '@testing-library/jest-dom';

import { NodeType } from '@stoplight/types';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { BundledBranchNode, IntegrationKind } from '../../types';
import { MarkdownViewer } from '.';
import { MarkdownComponentsProvider } from './CustomComponents/Provider';
import { createResolvedImageComponent } from './CustomComponents/ResolvedImage';

describe('RequestSend', () => {
  it('works', () => {
    const branchNode: BundledBranchNode = {
      id: 54234624,
      data: 'some data',
      type: NodeType.Article,
      name: 'Some Article',
      uri: '/docs/some-article.md',
      summary: 'some summary',
      branchSlug: 'master',
      workspaceIntegration: {
        kind: IntegrationKind.Github,
        apiUrl: 'https://api.github.com',
        hostUrl: 'https://github.com',
      },
      externalOrgSlug: 'organisation',
      externalSlug: 'project',
    };

    render(
      <MarkdownComponentsProvider value={{ image: createResolvedImageComponent(branchNode) }}>
        <MarkdownViewer markdown={`![alt text](../../common/images/icon48.png "Logo Title Text 1")`} />
      </MarkdownComponentsProvider>,
    );

    const image = screen.getByTitle('Logo Title Text 1');

    expect(image).toHaveAttribute('src', 'https://raw.github.com/organisation/project/master/common/images/icon48.png');
  });
});
