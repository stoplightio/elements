import { Node } from '../types';

export class ResponseError extends Error {
  code: number;

  constructor(message: string, responseCode: number) {
    super(message);
    this.name = 'ResponseError';
    this.code = responseCode;
  }
}

export const getNodeContent = async ({
  nodeSlug,
  projectId,
  branchSlug,
  platformUrl = 'https://stoplight.io',
}: {
  nodeSlug: string;
  projectId: string;
  branchSlug?: string;
  platformUrl?: string;
}): Promise<Node> => {
  const nodeId = getNodeIdFromSlug(nodeSlug);
  const branchQuery = branchSlug ? `?branch=${branchSlug}` : '';
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/nodes/${nodeId}${branchQuery}`, {
    headers: {
      'Stoplight-Elements-Version': '1.0.0',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new ResponseError('Payment Required', response.status);
  }

  return data;
};

function getNodeIdFromSlug(nodeSlug: string) {
  return nodeSlug.split('-')[0];
}
