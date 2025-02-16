import { CustomLinkComponent } from '@stoplight/elements-core';
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import nodeContent from '../../__fixtures__/node-content.json';
import { NodeContent } from './NodeContent';

const DummyLink: CustomLinkComponent = ({ children, ...propsRest }) => {
  return <a {...propsRest}>{children}</a>;
};

const data = {
  id: '35hsi28m3b2m0',
  branch_node_id: -1,
  type: 'article',
  uri: '/docs/test.md',
  slug: '35hsi28m3b2m0-header',
  title: 'Header',
  summary:
    'This is the main header section.\nThe beginning of an awesome article...\nLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetu...',
  project_id: 'cHJqOjQz',
  branch_id: 'YnI6MjQw',
  branch: 'main',
  links: {},
  outbound_edges: [
    {
      id: '35hsi28m3b2m0',
      type: 'article',
      slug: '35hsi28m3b2m0-header',
      title: 'Header',
      uri: '/docs/test.md',
    },
  ],
  inbound_edges: [],
  data: '---\nstoplight-id: 35hsi28m3b2m0\n---\n\n# Header\nThis is the main header section.\nThe beginning of an awesome article...\nLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Naggggm quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,\n\n## Subheader\nThis is the subheader section. More ContentHere is some more dummy content to fill the page.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.\nThe beginning of an awesome article...\nLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Naggggm quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,\n### External\nLinkFor more information, visit Google.\nThe beginning of an awesome article...\nLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Naggggm quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,\n\n[Go to header](#header)\n\n[Go to subheader](#subheader)\n\n<a href="https://www.google.com">Go to Google</a>',
};
describe(NodeContent.name, () => {
  it('renders correctly', async () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={nodeContent} Link={DummyLink} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /create todo/i })).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Markdown is supported in descriptions. Add information here for users to get accustomed to endpoints',
      ),
    ).toBeInTheDocument();

    unmount();
  });

  it('shows TryIt by default', () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={nodeContent} Link={DummyLink} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/send api request/i)).toBeInTheDocument();

    unmount();
  });

  it('can hide TryIt', () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={nodeContent} Link={DummyLink} hideTryIt />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/send api request/i)).not.toBeInTheDocument();

    unmount();
  });

  it('can hide SecurityInfo', () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={nodeContent} Link={DummyLink} hideSecurityInfo />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /create todo/i })).toBeInTheDocument();
    expect(screen.queryByText(/API Key/i)).not.toBeInTheDocument();

    unmount();
  });
});

describe('NodeContent Component Navigation Links', () => {
  const originalLocation = window.location;
  beforeAll(() => {
    delete (window as any).location;
    (window as any).location = {
      ...originalLocation,
      pathname: data.slug,
    };
  });

  it('renders links with correct href attributes and navigates to target sections on click', () => {
    const { unmount } = render(
      <MemoryRouter>
        <NodeContent node={data} Link={DummyLink} hideSecurityInfo />
      </MemoryRouter>,
    );

    const headerElement = screen.getByRole('link', { name: /Go to header/i });
    const subheaderElement = screen.getByRole('link', { name: /Go to subheader/i });

    expect(headerElement).toHaveAttribute('href', '#header');
    expect(subheaderElement).toHaveAttribute('href', '#subheader');
    fireEvent.click(headerElement);

    expect(document.getElementById('header')).toBeInTheDocument();
    fireEvent.click(subheaderElement);
    expect(document.getElementById('subheader')).toBeInTheDocument();

    unmount();

    afterAll(() => {
      window.location = originalLocation;
    });
  });
});
