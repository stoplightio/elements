import '@stoplight/elements/styles/elements.scss';
import '../styles/stoplight.scss';

import { PageProps } from 'gatsby';
import React from 'react';

import Api from '../components/api-page';
import Layout from '../components/layout';
import SEO from '../components/seo';

const ApiPage = ({ location }: PageProps) => {
  return (
    <div className="bg-gray-1">
      <Layout centered={false}>
        <SEO title="API" />

        <Api basePath="api" />
      </Layout>
    </div>
  );
};

export default ApiPage;
