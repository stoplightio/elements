import '@stoplight/elements/styles/elements.scss';
import '../styles/stoplight.scss';

import { Card, Icon } from '@stoplight/ui-kit';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

import Header from '../components/header';
import SEO from '../components/seo';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery2 {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="bg-gray-1 h-screen">
      <SEO title="Home" />
      <Header siteTitle={data.site.siteMetadata.title} centered />

      <div className="h-96 bg-blue-6 flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto text-center text-white">
          <div className="text-3xl mb-5">Elements API</div>
          <div className="text-xl max-w-3xl opacity-75">Sample usage of Elements APIs</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex flex-wrap">
          <Link className="reset mr-10 mb-10 flex-1" to="/stoplight-project/">
            <Card interactive elevation={1}>
              <div className="flex">
                <Icon icon="code" iconSize={24} />
                <div className="flex-1 ml-4">
                  <div className="text-xl">Stoplight Project</div>
                  <p>View API docs for Stoplight platform project</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link className="reset mr-10 mb-10 flex-1" to="/api/">
            <Card interactive elevation={1}>
              <div className="flex">
                <Icon icon="cloud" iconSize={24} />
                <div className="flex-1 ml-4">
                  <div className="text-xl">API</div>
                  <p>View API docs from OAS document</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
