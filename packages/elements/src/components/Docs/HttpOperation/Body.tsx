import { IHttpOperationRequestBody } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import { useClasses } from '../../../hooks/useClasses';
import { useClick } from '../../../hooks/useClick';
import { useStyle } from '../../../hooks/useStyle';
import { WithIds } from '../../../types';
import { isJSONSchema } from '../../../utils/guards';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SchemaViewer } from '../../SchemaViewer';
import { SectionTitle } from './SectionTitle';
import { getExamplesObject } from './utils';

export interface IBodyProps {
  body: WithIds<IHttpOperationRequestBody>;
  className?: string;
}

export const Body = ({ body, className }: IBodyProps) => {
  const classes = useClasses(body);
  const style = useStyle(body);
  const onClick = useClick(body);

  const descriptionClasses = useClasses(body, 'description');
  const descriptionOnClick = useClick(body, 'description');

  if (typeof body !== 'object' || !body.contents) return null;

  // TODO (CL): Support multiple bodies?
  const content = body.contents && body.contents[0];
  const schema = content?.schema;
  const examples = getExamplesObject(content?.examples || []);

  // If we have nothing to show then don't render this section
  if (!content || (!body.description && !schema && !examples)) return null;

  return (
    <div className={cn('HttpOperation__Body', className, classes)} style={style} onClick={onClick}>
      <SectionTitle title="Request Body" />

      {body.description && (
        <MarkdownViewer
          className={cn('mt-6', descriptionClasses)}
          markdown={body.description}
          onClick={descriptionOnClick}
        />
      )}

      {isJSONSchema(schema) && <SchemaViewer className="mt-6" schema={schema} examples={examples} />}
    </div>
  );
};
Body.displayName = 'HttpOperation.Body';
