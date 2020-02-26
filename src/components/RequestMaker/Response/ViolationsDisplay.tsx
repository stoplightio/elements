import { IPrismDiagnostic } from '@stoplight/prism-core';
import * as React from 'react';

export const ViolationsDisplay = ({ violations }: { violations: IPrismDiagnostic[] }) => {
  return (
    <section className="RequestMaker__SuggestionBar p-2 pl-4 pr-4">
      {violations.length ? (
        <div>
          <strong>
            The returned response has some violations with the JSON Schema associated with the current operation
          </strong>
          <ul>
            {violations.map(v => (
              <li key={v.message}>
                {v.path} {v.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        undefined
      )}
    </section>
  );
};

ViolationsDisplay.displayName = 'RequestMaker.ViolationsDisplay';
