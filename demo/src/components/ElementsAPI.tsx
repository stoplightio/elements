import '@stoplight/elements/styles/elements.scss';

import { API } from '@stoplight/elements';
import React, { useContext } from 'react';

import { GlobalContext } from '../context';

export const ElementsAPI: React.FC = () => {
  const state = useContext(GlobalContext);

  return <API apiDescriptionUrl={state.apiDescriptionUrl} router="hash" />;
};
