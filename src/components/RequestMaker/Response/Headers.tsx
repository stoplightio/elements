import { HTMLTable } from '@stoplight/ui-kit';
import cn from 'classnames';
import { isNonEmpty } from 'fp-ts/lib/Array';
import { map } from 'lodash';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMaker';
import { ViolationsDisplay } from './ViolationsDisplay';

export interface IResponseHeaders {
  className?: string;
}

export const ResponseHeaders = observer<IResponseHeaders>(({ className }) => {
  const responseStore = useRequestMakerStore('response');

  const headers = Object.entries(responseStore.headers);

  if (!headers.length) {
    return <div className="text-center p-10 text-gray-6">No response headers</div>;
  }

  const headerViolations = responseStore.violations.filter(v => v.path && v.path[0] === 'header');

  return (
    <>
      {isNonEmpty(headerViolations) && <ViolationsDisplay violations={headerViolations} />}
      <HTMLTable
        className={cn('RequestMaker__ResponseHeaders container', className)}
        striped={true}
        condensed={true}
        interactive={true}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {map(headers, ([key, value]) => (
            <tr key={key} className="RequestMaker__ResponseHeader">
              <td className="font-bold">{key}</td>
              <td>
                <span>{value}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </>
  );
});
ResponseHeaders.displayName = 'RequestMaker.ResponseHeaders';
