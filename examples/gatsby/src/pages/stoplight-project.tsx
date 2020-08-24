import '@stoplight/elements/styles/elements.scss';
import '../styles/stoplight.scss';

import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import StoplightProject from '../components/stoplight-project-page';

const StoplightProjectPage = () => {
  return (
    <div className="bg-gray-1">
      <Layout centered={false}>
        <SEO title="Stoplight Project" />

        <StoplightProject basePath="stoplight-project" />
      </Layout>
    </div>
  );
};

export default StoplightProjectPage;
