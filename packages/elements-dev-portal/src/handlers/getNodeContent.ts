import { Node } from '../types';
import { appVersion } from '../version';

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
  platformAuthToken,
}: {
  nodeSlug: string;
  projectId: string;
  branchSlug?: string;
  platformUrl?: string;
  platformAuthToken?: string;
}): Promise<Node> => {
  const nodeId = getNodeIdFromSlug(nodeSlug);
  const branchQuery = branchSlug ? `?branch=${branchSlug}` : '';
  const response = await fetch(`${platformUrl}/api/v1/projects/${projectId}/nodes/${nodeId}${branchQuery}`, {
    headers: {
      'Stoplight-Elements-Version': appVersion,
      ...(platformAuthToken && { Authorization: `Bearer ${platformAuthToken}` }),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 402) {
      throw new ResponseError('Payment Required', response.status);
    } else if (response.status === 403) {
      throw new ResponseError('Forbidden', response.status);
    } else {
      throw new ResponseError('Something went wrong', response.status);
    }
  }

  return data;
};

function getNodeIdFromSlug(nodeSlug: string) {
  return nodeSlug.split('-')[0];
}
