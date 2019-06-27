import { ITableOfContentsNode } from '../utils/node';
import { useRequest } from './useRequest';

export interface IProjectTocResponse {
  project: {
    id: string;
    name: string;
    slug: string;
  };

  contents: ITableOfContentsNode[];
}

export const useProjectToc = (srn: string) => {
  return useRequest<IProjectTocResponse>({
    url: '/projects.toc',
    params: { srn },
  });
};
