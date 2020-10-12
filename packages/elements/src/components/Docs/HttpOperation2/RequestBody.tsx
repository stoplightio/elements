import cn from 'classnames';
import * as React from 'react';

import { IRequestBody } from '../../../AST/RequestBody';
import { groupNodes } from '../../../AST/utils';
import { isJSONSchema } from '../../../utils/guards';
import { SchemaViewer } from '../../SchemaViewer';
import { RequestBodyDescription } from './RequestBodyDescription';
import { SectionTitle } from './SectionTitle';
import { useClasses } from './useClasses';
import { useClick } from './useClick';
import { getExamplesObject } from './utils';

export interface IRequestBodyProps {
  data: IRequestBody;
  className?: string;
}

export const RequestBody = ({ data, className }: IRequestBodyProps) => {
  const classes = useClasses(data);
  const notify = useClick(data);
  if (typeof data !== 'object' || data.children.length === 0) return null;

  const grouped = groupNodes(data.children);
  // TODO (CL): Support multiple bodies?
  // const schema = content?.schema;
  // const examples = getExamplesObject(content?.examples || []);

  return (
    <div className={cn('HttpOperation__Body', className, classes)} onClick={notify}>
      <SectionTitle title="Request Body" />

      <RequestBodyDescription data={grouped.description?.[0]} />

      {/* {isJSONSchema(schema) && <SchemaViewer className="mt-6" schema={schema} examples={examples} />} */}
    </div>
  );
};
RequestBody.displayName = 'HttpOperation.Body';
