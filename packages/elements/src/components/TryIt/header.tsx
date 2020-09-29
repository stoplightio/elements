import { faMagic, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FAIcon, Popover, Position } from '@stoplight/ui-kit';
import * as React from 'react';

export const TryItHeader: React.FC = () => (
  <h2 className="opacity-75 ml-1 mt-10 mb-8 font-medium flex items-center">
    <div className="flex-1">
      <FAIcon icon={['fad', faMagic.iconName]} className="mr-4" /> Try It Out
    </div>
    <Popover
      boundary="window"
      position={Position.TOP_RIGHT}
      content={
        <div className="p-4 text-center w-96">
          Send HTTP requests to your API, or one of our mock servers, to see how it's going to respond. View the docs{' '}
          <a
            href="https://meta.stoplight.io/docs/studio/docs/Design-and-Modeling/05-request-maker.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </a>
        </div>
      }
      interactionKind="hover"
    >
      <FAIcon icon={faQuestionCircle.iconName} />
    </Popover>
  </h2>
);
