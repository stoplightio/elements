// import { useSearchDocsQuery } from '@stoplight/graphql';
import { deserializeSrn } from '@stoplight/path';
import { NodeType } from '@stoplight/types';

// return fake data here

export function useSearchQuery(query: string, srn: string, isOpen: boolean, group?: string) {
  // const { shortcode, orgSlug, projectSlug } = deserializeSrn(srn || '');

  // const { data, error, loading, fetchMore } = useSearchDocsQuery({
  //   fetchPolicy: 'network-only',
  //   skip: isOpen === false,
  //   variables: {
  //     search: query,
  //     shortcode,
  //     org: orgSlug,
  //     project: projectSlug,
  //     group,
  //     // pinned,
  //     first: 30,
  //   },
  // });

  return {
    data: [
      {
        id: 'ks8cwyvs',
        type: NodeType.Article,
        name: 'Modeling Introduction',
        srn: 'gh/stoplightio/studio/docs/designing-apis/10-getting-started.md',
      },
    ],

    error: '',
    loading: false,
    fetchMore: ({}) => {},
  };
}
