import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import cn from 'classnames';
import * as React from 'react';

import { Hub, IHub } from '../../containers/Hub';
import { Provider } from '../../containers/Provider';
import { providerKnobs } from './Provider';

export const darkMode = () => boolean('dark mode', false);

export const knobs = (): IHub => ({
  srn: text('srn', 'sl/org/project/docs/markdown/basic-syntax.md', 'Hub'),
});

storiesOf('containers/Hub', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div
      className={cn('bg-gray-1 dark:bg-gray-8 absolute bottom-0 left-0 right-0 top-0', {
        'bp3-dark': darkMode(),
      })}
    >
      <Wrapper providerProps={{ ...providerKnobs() }} hubProps={{ ...knobs() }} />
    </div>
  ));

const Wrapper = ({ providerProps, hubProps }: any) => {
  const [srn, setSrn] = React.useState(hubProps.srn);

  return (
    <Provider {...providerProps} onTreeNodeClick={node => setSrn(node.nodeData!.srn)}>
      <Hub className="h-full" srn={srn} />
    </Provider>
  );
};
