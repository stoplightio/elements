import { deserializeSrn as _desiralizeSrn, serializeSrn as _serializeSrn } from '@stoplight/path';
import { IDeserializedSrn } from '../types';

export function deserializeSrn(srn: string): IDeserializedSrn {
  const srnObj = _desiralizeSrn(srn);

  return {
    service: srnObj.shortcode,
    org: srnObj.orgSlug,
    project: srnObj.projectSlug || '',
    uri: srnObj.uri || '',
  };
}

export function serializeSrn({ service, org, project, uri }: Partial<IDeserializedSrn>) {
  return _serializeSrn({ shortcode: service || '', orgSlug: org || '', projectSlug: project, uri });
}
