import { StoplightProject } from '@stoplight/elements-dev-portal';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const StoplightProjectPage = () => {
  return (
    <Layout>
      <SEO title="Stoplight Elements" />

      <StoplightProject
        workspaceSlug="elements-examples"
        projectSlug="studio-demo"
        basePath="stoplight-project"
        router={typeof window === 'undefined' ? 'memory' : 'history'}
      />
    </Layout>
  );
};

export default StoplightProjectPage;
