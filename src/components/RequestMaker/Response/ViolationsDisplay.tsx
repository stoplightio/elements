import { IPrismDiagnostic } from '@stoplight/prism-core';
import * as React from 'react';

export const ViolationsDisplay = ({ violations }: { violations: IPrismDiagnostic[] }) => {
  return (
    <div className="RequestMaker__SuggestionBar p-2 pl-4 pr-4">
      {violations.length ? (
        <div>
          <b>The returned response has some violations with the JSON Schema associated with the current operation</b>
          <ol>
            {violations.map(v => (
              <li>
                {v.path} {v.message}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};

ViolationsDisplay.displayName = 'RequestMaker.ViolationsDisplay';
