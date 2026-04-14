import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import * as React from 'react';

import { withMosaicProvider } from '../../hoc/withMosaicProvider';
import { TableOfContents as TOC } from './TableOfContents';
import { TableOfContentsItem } from './types';
import { findFirstNode } from './utils';

const TableOfContents = withMosaicProvider(TOC);

const Link: React.FC = ({ children }) => <>{children}</>;

describe('TableOfContents', () => {
  describe('Group', () => {
    it('should only render group contents when open', () => {
      const { unmount } = render(
        <TableOfContents
          activeId=""
          tree={[
            {
              title: 'Root',
              items: [
                {
                  id: 'targetId',
                  title: 'Target',
                  slug: 'target',
                  type: 'article',
                  meta: '',
                  index: '0-',
                },
              ],
            },
          ]}
          Link={Link}
        />,
      );

      expect(screen.queryByTitle('Root')).toBeInTheDocument();
      expect(screen.queryByTitle('Target')).not.toBeInTheDocument();

      unmount();
    });

    it('it renders group contents if maxDepthOpenByDefault > 0', () => {
      const { unmount } = render(
        <TableOfContents
          activeId=""
          tree={[
            {
              title: 'Root',
              items: [
                {
                  id: 'targetId',
                  title: 'Target',
                  slug: 'target',
                  type: 'article',
                  meta: '',
                  index: '0-',
                },
              ],
            },
          ]}
          Link={Link}
          maxDepthOpenByDefault={1}
        />,
      );

      expect(screen.queryByTitle('Root')).toBeInTheDocument();
      expect(screen.queryByTitle('Target')).toBeInTheDocument();

      unmount();
    });

    it('should default open when nested child is active', () => {
      const { unmount } = render(
        <TableOfContents
          activeId="targetId"
          tree={[
            {
              title: 'Root',
              items: [
                {
                  title: 'Group',
                  items: [
                    {
                      id: 'targetId',
                      title: 'Target',
                      slug: 'target',
                      type: 'article',
                      meta: '',
                      index: '0-0-',
                    },
                  ],
                  index: '0-',
                },
              ],
            },
          ]}
          Link={Link}
        />,
      );

      expect(screen.queryByTitle(/Root/)).toBeInTheDocument();
      expect(screen.queryByTitle(/Group/)).toBeInTheDocument();
      expect(screen.queryByTitle(/Target/)).toBeInTheDocument();

      unmount();
    });

    it('should close an opened group on click, with active highlighting', () => {
      const { unmount } = render(
        <TableOfContents
          maxDepthOpenByDefault={1}
          activeId="targetId"
          tree={[
            {
              title: 'Root',
              items: [
                {
                  id: 'targetId',
                  title: 'Target',
                  slug: 'target',
                  type: 'article',
                  meta: '',
                  index: '0-',
                },
              ],
            },
          ]}
          Link={Link}
        />,
      );

      const Root = screen.queryByTitle(/Root/);

      expect(Root).toBeInTheDocument();
      expect(Root).toHaveClass('sl-bg-canvas-100');
      expect(screen.queryByTitle('Target')).toBeInTheDocument();

      Root?.click();
      expect(Root).toHaveClass('sl-bg-primary-tint');
      expect(screen.queryByTitle('Target')).not.toBeInTheDocument();

      unmount();
    });

    it('should open a closed group on click', () => {
      const { unmount } = render(
        <TableOfContents
          activeId=""
          tree={[
            {
              title: 'Root',
              items: [
                {
                  id: 'targetId',
                  title: 'Target',
                  slug: 'target',
                  type: 'article',
                  meta: '',
                  index: '0-',
                },
              ],
            },
          ]}
          Link={Link}
        />,
      );

      const Root = screen.queryByTitle(/Root/);

      expect(Root).toBeInTheDocument();
      expect(screen.queryByTitle(/Target/)).not.toBeInTheDocument();

      Root?.click();

      expect(screen.queryByTitle(/Target/)).toBeInTheDocument();

      unmount();
    });

    it('should display item version', () => {
      const { unmount } = render(
        <TableOfContents
          activeId=""
          maxDepthOpenByDefault={1}
          tree={[
            {
              title: 'Root',
              items: [
                {
                  id: 'abc',
                  title: 'Todo Api',
                  slug: 'abc-todo-api',
                  type: 'http_service',
                  items: [],
                  meta: '',
                  version: '2',
                  index: '0-',
                },
                {
                  id: 'def',
                  title: 'Todo',
                  slug: 'def-todo',
                  type: 'model',
                  meta: '',
                  version: '1.0.1',
                  index: '1-',
                },
                {
                  id: 'ghi',
                  title: 'Get Todo',
                  slug: 'ghi-get-todo',
                  type: 'http_operation',
                  meta: 'get',
                  version: '1.0.2',
                  index: '2-',
                },
              ],
            },
          ]}
          Link={Link}
        />,
      );

      expect(screen.queryByText(/v2/)).toBeInTheDocument();
      expect(screen.queryByText(/v1.0.1/)).toBeInTheDocument();

      expect(screen.queryByText(/v1.0.2/)).not.toBeInTheDocument();

      unmount();
    });
  });
});

describe('utils', () => {
  describe('findFirstNode', () => {
    it('should find the first node', () => {
      const items: TableOfContentsItem[] = [
        {
          title: 'group',
          items: [
            {
              id: 'abc',
              title: 'Doc',
              type: 'article',
              slug: 'abc-doc',
              meta: '',
              index: '0-',
            },
            {
              id: 'targetId',
              title: 'Target',
              slug: 'target',
              type: 'article',
              meta: '',
              index: '1-',
            },
          ],
        },
      ];

      const firstNode = findFirstNode(items);

      expect(firstNode).toEqual({
        id: 'abc',
        title: 'Doc',
        type: 'article',
        slug: 'abc-doc',
        meta: '',
        index: '0-',
      });
    });

    it('should ignore group node if slug is empty', () => {
      const items: TableOfContentsItem[] = [
        {
          id: 'abc',
          title: 'Todo API',
          type: 'http_service',
          meta: '',
          slug: '',
          items: [
            {
              id: 'def',
              title: 'Get Todo',
              slug: 'def-get-todo',
              type: 'http_operation',
              meta: 'get',
              index: '0-',
            },
            {
              id: 'ghi',
              title: 'Add Todo',
              slug: 'ghi-add-todo',
              type: 'http_operation',
              meta: 'post',
              index: '1-',
            },
          ],
        },
      ];

      const firstNode = findFirstNode(items);
      expect(firstNode).toEqual({
        id: 'def',
        title: 'Get Todo',
        slug: 'def-get-todo',
        type: 'http_operation',
        meta: 'get',
        index: '0-',
      });
    });
  });
  describe('TableOfContents - Dividers, Links, Nodes, Groups, and Nesting', () => {
    describe('Divider Component', () => {
      it('should render divider with title', () => {
        const { unmount } = render(
          <TableOfContents
            activeId=""
            tree={[
              {
                title: 'Section Title',
              },
            ]}
            Link={Link}
          />,
        );

        expect(screen.getByText('Section Title')).toBeInTheDocument();
        unmount();
      });

      it('should render divider with responsive mode styling', () => {
        const { unmount } = render(
          <TableOfContents
            activeId=""
            tree={[
              {
                title: 'Section Title',
              },
            ]}
            Link={Link}
            isInResponsiveMode={true}
          />,
        );

        expect(screen.getByText('Section Title')).toBeInTheDocument();
        unmount();
      });
    });

    describe('External Links', () => {
      it('should render external link with title', () => {
        const { unmount } = render(
          <TableOfContents
            activeId=""
            tree={[
              {
                title: 'External Link',
                url: 'https://example.com',
              },
            ]}
            Link={Link}
          />,
        );

        expect(screen.getByText('External Link')).toBeInTheDocument();
        unmount();
      });
    });

    describe('Node Component', () => {
      it('should render node with meta information', () => {
        const { unmount } = render(
          <TableOfContents
            activeId=""
            maxDepthOpenByDefault={1}
            tree={[
              {
                title: 'Root',
                items: [
                  {
                    id: 'test-node',
                    title: 'Test Node',
                    slug: 'test-node',
                    type: 'http_operation',
                    meta: 'get',
                    index: '0-',
                  },
                ],
              },
            ]}
            Link={Link}
          />,
        );

        expect(screen.queryByText('Test Node')).toBeInTheDocument();
        expect(screen.queryByText('get')).toBeInTheDocument();
        unmount();
      });

      it('should handle node click and set active state', () => {
        const onLinkClick = jest.fn();
        const { unmount } = render(
          <TableOfContents
            activeId=""
            maxDepthOpenByDefault={1}
            tree={[
              {
                title: 'Root',
                items: [
                  {
                    id: 'test-node',
                    title: 'Test Node',
                    slug: 'test-node',
                    type: 'http_operation',
                    meta: 'get',
                    index: '0-',
                  },
                ],
              },
            ]}
            Link={Link}
            onLinkClick={onLinkClick}
          />,
        );

        const node = screen.queryByText('Test Node');
        node?.click();
        expect(onLinkClick).toHaveBeenCalled();
        unmount();
      });

      it('should not trigger link click when node is already active', () => {
        const onLinkClick = jest.fn();
        const { unmount } = render(
          <TableOfContents
            activeId="test-node"
            maxDepthOpenByDefault={1}
            tree={[
              {
                title: 'Root',
                items: [
                  {
                    id: 'test-node',
                    title: 'Test Node',
                    slug: 'test-node',
                    type: 'http_operation',
                    meta: 'get',
                    index: '0-',
                  },
                ],
              },
            ]}
            Link={Link}
            onLinkClick={onLinkClick}
          />,
        );

        const node = screen.queryByText('Test Node');
        node?.click();
        expect(onLinkClick).not.toHaveBeenCalled();
        unmount();
      });
    });

    describe('Group Expansion', () => {
      it('should expand group when clicking chevron icon', () => {
        const { unmount, container } = render(
          <TableOfContents
            activeId=""
            tree={[
              {
                title: 'Root',
                items: [
                  {
                    id: 'test-item',
                    title: 'Test Item',
                    slug: 'test-item',
                    type: 'article',
                    meta: '',
                    index: '0-',
                  },
                ],
              },
            ]}
            Link={Link}
          />,
        );

        expect(screen.queryByTitle(/Test Item/)).not.toBeInTheDocument();

        const chevronIcon = container.querySelector('[data-icon="chevron-right"]') as HTMLElement;
        fireEvent.click(chevronIcon);

        expect(screen.queryByTitle(/Test Item/)).toBeInTheDocument();
        unmount();
      });

      it('should collapse group when clicking chevron icon on open group', () => {
        const { unmount, container } = render(
          <TableOfContents
            activeId=""
            maxDepthOpenByDefault={1}
            tree={[
              {
                title: 'Root',
                items: [
                  {
                    id: 'test-item',
                    title: 'Test Item',
                    slug: 'test-item',
                    type: 'article',
                    meta: '',
                    index: '0-',
                  },
                ],
              },
            ]}
            Link={Link}
          />,
        );

        expect(screen.queryByTitle(/Test Item/)).toBeInTheDocument();

        const chevronIcon = container.querySelector('[data-icon="chevron-down"]') as HTMLElement;
        fireEvent.click(chevronIcon);

        expect(screen.queryByTitle(/Test Item/)).not.toBeInTheDocument();
        unmount();
      });
    });

    describe('Version Badge', () => {
      it('should not display version for http_operation type', () => {
        const { unmount } = render(
          <TableOfContents
            activeId=""
            maxDepthOpenByDefault={1}
            tree={[
              {
                title: 'Root',
                items: [
                  {
                    id: 'operation',
                    title: 'Get Operation',
                    slug: 'operation',
                    type: 'http_operation',
                    meta: 'get',
                    version: '1.0.0',
                    index: '0-',
                  },
                ],
              },
            ]}
            Link={Link}
          />,
        );

        expect(screen.queryByText(/v1.0.0/)).not.toBeInTheDocument();
        unmount();
      });

      it('should display version for non-http_operation types with meta', () => {
        const { unmount } = render(
          <TableOfContents
            activeId=""
            maxDepthOpenByDefault={1}
            tree={[
              {
                title: 'Root',
                items: [
                  {
                    id: 'service',
                    title: 'API Service',
                    slug: 'service',
                    type: 'http_service',
                    meta: '',
                    version: '2.1.0',
                    index: '0-',
                    items: [],
                  },
                ],
              },
            ]}
            Link={Link}
          />,
        );

        expect(screen.queryByText(/v2.1.0/)).toBeInTheDocument();
        unmount();
      });
    });

    describe('Responsive Mode', () => {
      it('should apply responsive styling when isInResponsiveMode is true', () => {
        const { unmount } = render(
          <TableOfContents
            activeId=""
            maxDepthOpenByDefault={1}
            tree={[
              {
                title: 'Root',
                items: [
                  {
                    id: 'test-item',
                    title: 'Test Item',
                    slug: 'test-item',
                    type: 'article',
                    meta: '',
                    index: '0-',
                  },
                ],
              },
            ]}
            Link={Link}
            isInResponsiveMode={true}
          />,
        );

        expect(screen.queryByTitle(/Test Item/)).toBeInTheDocument();
        unmount();
      });
    });

    describe('Deep Nesting', () => {
      it('should handle deeply nested groups', () => {
        const { unmount } = render(
          <TableOfContents
            activeId="deep-item"
            tree={[
              {
                title: 'Level 1',
                items: [
                  {
                    title: 'Level 2',
                    index: '0-',
                    items: [
                      {
                        title: 'Level 3',
                        index: '0-0-',
                        items: [
                          {
                            id: 'deep-item',
                            title: 'Deep Item',
                            slug: 'deep-item',
                            type: 'article',
                            meta: '',
                            index: '0-0-0-',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ]}
            Link={Link}
          />,
        );

        expect(screen.queryByTitle(/Level 1/)).toBeInTheDocument();
        expect(screen.queryByTitle(/Level 2/)).toBeInTheDocument();
        expect(screen.queryByTitle(/Level 3/)).toBeInTheDocument();
        expect(screen.queryByTitle(/Deep Item/)).toBeInTheDocument();
        unmount();
      });
    });

    describe('Error Cases', () => {
      it('should handle empty tree', () => {
        const { unmount } = render(<TableOfContents activeId="" tree={[]} Link={Link} />);

        expect(screen.queryByTitle(/Root/)).not.toBeInTheDocument();
        unmount();
      });

      it('should handle invalid item types', () => {
        const { unmount } = render(
          <TableOfContents
            activeId=""
            tree={[
              {
                title: 'Invalid Item',
                // Missing required properties
              } as any,
            ]}
            Link={Link}
          />,
        );

        expect(screen.queryByTitle(/Invalid Item/)).not.toBeInTheDocument();
        unmount();
      });
    });
  });
});
