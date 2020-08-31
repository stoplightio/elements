import React from 'react';
import { StoplightProject } from '@stoplight/elements'
import '@stoplight/elements/styles/elements.scss'

function stoplightProject() {
  return (
    <div>
      <StoplightProject workspace="https://elements.stoplight.io" project="studio-demo"></StoplightProject>
    </div>
  );
}

export default stoplightProject;
