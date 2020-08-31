import React from 'react';
import { API } from '@stoplight/elements'
import '@stoplight/elements/styles/elements.scss'

function stoplightAPI() {
  return (
    <div>
      <API apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.v1.json"></API>
    </div>
  );
}

export default stoplightAPI;
