import cn from 'classnames';
import * as React from 'react';
import { Tag, CodeViewer } from '@stoplight/ui-kit';
import { ProblemJsonError } from '@stoplight/prism-http';
import { usePrettifiedResponse } from '../../hooks/usePrettifiedResponse';

export type ErrorViewerProps = {
  error: Error;
};

export const ErrorViewer: React.FC<ErrorViewerProps> = ({ error }) => {
  return (
    <div className="RequestMaker__ErrorViewer">
      {error instanceof ProblemJsonError ? (
        <PrismErrorDisplay error={error} />
      ) : (
        <GenericErrorDisplay errorMessage={error.message} />
      )}
    </div>
  );
};

type GenericErrorDisplayProps = {
  errorMessage: string;
};

const GenericErrorDisplay: React.FC<GenericErrorDisplayProps> = ({ errorMessage }) => {
  return (
    <div className="p-6">
      <h5 className="text-lg pb-2">
        <Tag intent="danger" className="mr-2">
          Error
        </Tag>
        Error while making the request
      </h5>
      {errorMessage}
    </div>
  );
};

type PrismErrorDisplayProps = {
  error: ProblemJsonError;
};

const PrismErrorDisplay: React.FC<PrismErrorDisplayProps> = ({ error }) => {
  const formattedDetails = usePrettifiedResponse(error.additional || {}, 'json');

  return (
    <div className="p-6">
      <h5 className="text-lg pb-2">
        <Tag intent="danger" className="mr-2">
          {error.status || '-'}
        </Tag>
        {error.message}
      </h5>
      {error.detail && <p>{error.detail}</p>}
      {error.additional && <CodeViewer language={'json'} value={formattedDetails} className="pt-5" showLineNumbers />}
    </div>
  );
};
