import {
  HttpSecurityScheme,
  IOauth2AuthorizationCodeFlow,
  IOauth2ClientCredentialsFlow,
  IOauth2ImplicitFlow,
  IOauth2PasswordFlow,
} from '@stoplight/types';
import { Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { entries, flatten, isEmpty, map, startCase } from 'lodash';
import * as React from 'react';

import { HttpSecuritySchemeColors } from '../../../constants';
import { useClasses } from '../../../hooks/useClasses';
import { useClick } from '../../../hooks/useClick';
import { useStyle } from '../../../hooks/useStyle';
import { WithIds } from '../../../Y';
import { MarkdownViewer } from '../../MarkdownViewer';
import { SectionTitle } from '../HttpOperation/SectionTitle';

export interface ISecuritiesProps {
  securities?: HttpSecurityScheme[];
  className?: string;
  title?: string;
}

export const HttpSecuritySchemes = ({ securities, title, className }: ISecuritiesProps) => {
  if (!securities || !securities.length) return null;

  return (
    <div className={cn('HttpSecuritySchemes', className)}>
      {title && <SectionTitle title={title} />}

      <div className="TreeList">
        {flatten(securities).map((security, index) => {
          const securityClassName = cn('TreeListItem', {
            'TreeListItem--striped': index % 2 !== 0,
          });

          return <SecurityScheme key={security.key} className={securityClassName} security={security} />;
        })}
      </div>
    </div>
  );
};
HttpSecuritySchemes.displayName = 'HttpSecuritySchemes';

const SecurityScheme = ({ security, className }: { security: WithIds<HttpSecurityScheme>; className?: string }) => {
  const classes = useClasses(security);
  const style = useStyle(security);
  const onClick = useClick(security);

  const keyClasses = useClasses(security, 'key');
  const onKeyClick = useClick(security, 'key');

  const nameClasses = useClasses(security, 'name');
  const onNameClick = useClick(security, 'name');

  const descriptionClasses = useClasses(security, 'description');
  const onDescriptionClick = useClick(security, 'description');

  const typeClasses = useClasses(security, 'type');
  const onTypeClick = useClick(security, 'type');

  const inClasses = useClasses(security, 'in');
  const onInClick = useClick(security, 'in');

  return (
    <div
      className={cn(className, 'HttpSecuritySchemes__SecurityScheme px-4 py-3 flex items-start', classes)}
      style={{ alignItems: 'start', ...style }}
      onClick={onClick}
    >
      <div style={{ minWidth: '60px' }}>
        <div className={cn(keyClasses)} onClick={onKeyClick}>
          {security.key}
        </div>
        <div
          className={cn(
            'text-sm',
            `text-${HttpSecuritySchemeColors[security.type]}-7`,
            `dark:text-${HttpSecuritySchemeColors[security.type]}-6`,
            typeClasses,
          )}
          onClick={onTypeClick}
        >
          {security.type}
        </div>
      </div>

      <div className="flex-1 ml-4">
        {security.description && (
          <MarkdownViewer
            className={cn('flex-1 text-darken-7 dark:text-lighten-7', descriptionClasses)}
            onClick={onDescriptionClick}
            markdown={security.description}
          />
        )}

        <div className="flex flex-wrap">
          {'scheme' in security && security.scheme && (
            <Tag className="mt-2 mr-2" minimal>
              Scheme: {security.scheme}
            </Tag>
          )}

          {'bearerFormat' in security && security.bearerFormat && (
            <Tag className="mt-2 mr-2" minimal>
              Bearer Format: {security.bearerFormat}
            </Tag>
          )}

          {'in' in security && security.in && (
            <Tag className="mt-2 mr-2" minimal>
              <span className={cn(inClasses)} onClick={onInClick}>
                {startCase(security.in)} parameter name:
              </span>{' '}
              <span className={cn(nameClasses)} onClick={onNameClick}>
                {security.name}
              </span>
            </Tag>
          )}

          {'openIdConnectUrl' in security && security.openIdConnectUrl && (
            <Tag className="mt-2 mr-2" minimal>
              OpenId Connect URL: {security.openIdConnectUrl}
            </Tag>
          )}
        </div>

        {security.type === 'oauth2' &&
          map(security.flows, (flowObject, flow) => (
            <OAuth2Flow key={flow} flow={flow} flowObject={flowObject as any} />
          ))}
      </div>
    </div>
  );
};
SecurityScheme.displayName = 'HttpSecuritySchemes.SecurityScheme';

const OAuth2Flow = ({
  flow,
  flowObject,
}: {
  flow: string;
  flowObject?: IOauth2ImplicitFlow | IOauth2PasswordFlow | IOauth2ClientCredentialsFlow | IOauth2AuthorizationCodeFlow;
  className?: string;
}) => {
  if (!flowObject) return null;

  return (
    <div className="py-2 mt-2 border-t HttpSecuritySchemes__OAuth2Flow">
      <div className="py-2 font-semibold">{startCase(flow)} OAuth Flow</div>

      {'authorizationUrl' in flowObject && flowObject.authorizationUrl && (
        <div className="flex items-center py-1">
          <div className="mr-1">Authorize URL -</div>
          <div>
            <a href={flowObject.authorizationUrl} target="_blank" rel="noopener noreferrer">
              {flowObject.authorizationUrl}
            </a>
          </div>
        </div>
      )}

      {'tokenUrl' in flowObject && flowObject.tokenUrl && (
        <div className="flex items-center py-1">
          <div className="mr-1">Token URL -</div>
          <div>
            <a href={flowObject.tokenUrl} target="_blank" rel="noopener noreferrer">
              {flowObject.tokenUrl}
            </a>
          </div>
        </div>
      )}

      {'refreshUrl' in flowObject && flowObject.refreshUrl && (
        <div className="flex items-center py-1">
          <div className="mr-1">Refresh URL -</div>
          <div>
            <a href={flowObject.refreshUrl} target="_blank" rel="noopener noreferrer">
              {flowObject.refreshUrl}
            </a>
          </div>
        </div>
      )}

      {!isEmpty(flowObject.scopes) && (
        <>
          <div className="py-1">Scopes</div>
          <ul className="list-disc" style={{ margin: 0 }}>
            {entries(flowObject.scopes).map(([scope, description]) => {
              return (
                <li className="py-1" key={scope}>
                  <Tag minimal>{scope}</Tag> - <span className="text-darken-7 dark:text-lighten-7">{description}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
OAuth2Flow.displayName = 'HttpSecuritySchemes.OAuth2Flow';
