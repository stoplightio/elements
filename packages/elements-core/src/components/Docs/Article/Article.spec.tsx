import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { flow } from 'lodash';
import * as React from 'react';

import { withPersistenceBoundary } from '../../../context/Persistence';
import { withMosaicProvider } from '../../../hoc/withMosaicProvider';
import { withRouter } from '../../../hoc/withRouter';
import type { RoutingProps } from '../../../types';
import { Article as _Article } from './index';

const Article = withMosaicProvider(withPersistenceBoundary(_Article));

const ArticleWithRouter = flow(
  withRouter,
  withPersistenceBoundary,
  withMosaicProvider,
)((props: RoutingProps & { data: string }) => {
  return <_Article data={props.data} />;
});

describe('Article', () => {
  it('should not require any router', () => {
    const { unmount } = render(<Article data="## Hey there" />);

    expect(screen.getByText(/Hey there/i)).toBeInTheDocument();

    unmount();
  });

  it('given hash router, should have correct links', () => {
    const { unmount } = render(<ArticleWithRouter router="hash" data="[abc](#abc)" />);

    expect(screen.getByText(/abc/i)).toHaveAttribute('href', '#abc');

    unmount();
  });
});
