import { navigate } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => {
  React.useEffect(() => {
    navigate('/stoplight-project');
  });

  return (
    <Layout>
      <SEO title="Home" />
    </Layout>
  );
};

export default IndexPage;
