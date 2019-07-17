interface IDeserializedSrn {
  service: string;
  org: string;
  project?: string;
  uri?: string;
  file?: string;
  ext?: string;
}

export function deserializeSrn(srn: string): IDeserializedSrn {
  const [service, org, project, ...uriParts] = srn.split('/');

  const uri = uriParts.length ? `/${uriParts.join('/')}` : `/`;

  return {
    service,
    org,
    project,
    uri,
  };
}

export function serializeSrn({ service, org, project, uri }: IDeserializedSrn) {
  return [service, org, project, (uri || '').replace(/^\//, '')].filter(Boolean).join('/');
}
