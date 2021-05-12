import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { InstagramAPI } from '../__fixtures__/api-descriptions/Instagram';
import { simpleApiWithoutDescription } from '../__fixtures__/api-descriptions/simpleApiWithoutDescription';
import { API } from './API';

describe('API', () => {
  const APIDocument = {
    ...InstagramAPI,
    info: {
      ...InstagramAPI.info,
      'x-logo': {
        ...InstagramAPI.info['x-logo'],
        altText: 'instagram-logo',
      },
    },
  };

  // we need to add scrollTo to the Element prototype before we mount so it has the method available
  Element.prototype.scrollTo = () => {};

  it('displays logo specified in x-logo property of API document', async () => {
    render(<API layout="sidebar" apiDescriptionDocument={InstagramAPI} />);

    // checks if altText defaults to "logo" if the prop is not passed in API document
    // checks if logo is present
    expect(await screen.findByAltText('logo')).toBeInTheDocument();
  });

  it('uses the altText property from the API document', async () => {
    render(<API layout="sidebar" apiDescriptionDocument={APIDocument} />);

    expect(await screen.findByAltText('instagram-logo')).toBeInTheDocument();
  });

  it("doesn't display the logo when no properties are passed neither via API document nor as component prop", async () => {
    render(<API layout="sidebar" apiDescriptionDocument={simpleApiWithoutDescription} />);

    expect(await screen.queryByAltText('logo')).not.toBeInTheDocument();
  });

  it('overrides the logo from API document with the one passed in a prop', async () => {
    render(<API logo="thisisarequiredprop" layout="sidebar" apiDescriptionDocument={APIDocument} />);

    expect(screen.queryByAltText('instagram-logo')).not.toBeInTheDocument();
    expect(await screen.findByAltText('logo')).toBeInTheDocument();
  });
});
