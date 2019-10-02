import { NodeType } from '@stoplight/types';
import { IContentsNode, IProjectNode } from '../../types';

export const nodes: IProjectNode[] = [
  {
    id: 'gzv028oc',
    type: NodeType.Article,
    name: 'UI Overview',
    srn: 'gh/stoplightio/studio/docs/ui-overview.md',
  },
  {
    id: 'ks8cwyvs',
    type: NodeType.Article,
    name: 'Modeling Introduction',
    srn: 'gh/stoplightio/studio/docs/designing-apis/10-getting-started.md',
  },
  {
    id: 'vxeympcn',
    type: NodeType.Article,
    name: 'Project Structure (Design & Modeling)',
    srn: 'gh/stoplightio/studio/docs/designing-apis/directory-structure.md',
  },
  {
    id: 'ovxlx772',
    type: NodeType.Article,
    name: 'Using References',
    srn: 'gh/stoplightio/studio/docs/designing-apis/using-references.md',
  },
  {
    id: 'bb4i9mek',
    type: NodeType.Article,
    name: 'Working with Models',
    srn: 'gh/stoplightio/studio/docs/designing-apis/http-endpoints.md',
  },
  {
    id: 'c2riagde',
    type: NodeType.Article,
    name: 'Validation and Linting',
    srn: 'gh/stoplightio/studio/docs/designing-apis/validation-style-guide.md',
  },
  {
    id: 'lnciknzw',
    type: NodeType.Article,
    name: 'Documentation Quickstart Guide',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/10-getting-started.md',
  },
  {
    id: '20p2qlve',
    type: NodeType.Article,
    name: 'Publishing in Studio',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/publishing.md',
  },
  {
    id: 'stz6uwdt',
    type: NodeType.Article,
    name: 'Using Images',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/using-images.md',
  },
  {
    id: 't6694f4v',
    type: NodeType.Article,
    name: 'Directory Structure (Documentation)',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/directory-structure.md',
  },
  {
    id: '4znkyjxn',
    type: NodeType.Article,
    name: 'Linking Between Articles',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/linking-between-articles.md',
  },
  {
    id: 'cu1rik0j',
    type: NodeType.Article,
    name: 'Using Markdown in Documentation',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/stoplight-flavored-markdown.md',
  },
  {
    id: 'yok9mcyg',
    type: NodeType.Article,
    name: 'Customize Interface Panels',
    srn: 'gh/stoplightio/studio/docs/workflow/customize-interface.md',
  },
  {
    id: 'kfc8upgh',
    type: NodeType.Article,
    name: 'Working with an Existing Project',
    srn: 'gh/stoplightio/studio/docs/workflow/working-with-existing-project.md',
  },
  {
    id: '3rxli9io',
    type: NodeType.Article,
    name: 'Working with Files',
    srn: 'gh/stoplightio/studio/docs/workflow/working-with-files.md',
  },
  {
    id: 'rb6z0v9w',
    type: NodeType.Article,
    name: 'Working with Git',
    srn: 'gh/stoplightio/studio/docs/workflow/working-with-git.md',
  },
  {
    id: 'readme',
    type: NodeType.Article,
    name: 'Studio Docs',
    srn: 'gh/stoplightio/studio/README.md',
  },
];

export const contents: IContentsNode[] = [
  {
    name: 'Studio Docs',
    srn: 'gh/stoplightio/studio/README.md',
    depth: 0,
    icon: 'download',
  },

  {
    name: 'UI Overview',
    srn: 'gh/stoplightio/studio/docs/ui-overview.md',
    depth: 0,
    icon: 'envelope',
  },

  {
    name: 'Designing Apis',
    depth: 0,
    type: 'group',
    icon: 'star',
  },
  {
    name: 'Modeling Introduction',
    srn: 'gh/stoplightio/studio/docs/designing-apis/10-getting-started.md',
    depth: 1,
    icon: 'download',
  },
  {
    name: 'Project Structure (Design & Modeling)',
    srn: 'gh/stoplightio/studio/docs/designing-apis/directory-structure.md',
    depth: 1,
    icon: 'star',
  },
  {
    name: 'Working with Models',
    srn: 'gh/stoplightio/studio/docs/designing-apis/http-endpoints.md',
    depth: 1,
    icon: 'envelope',
  },
  {
    name: 'Using References',
    srn: 'gh/stoplightio/studio/docs/designing-apis/using-references.md',
    depth: 1,
    icon: 'book',
  },
  {
    name: 'Validation and Linting',
    srn: 'gh/stoplightio/studio/docs/designing-apis/validation-style-guide.md',
    depth: 1,
    icon: 'briefcase',
  },

  {
    name: 'Workflow',
    depth: 0,
    type: 'group',
    icon: 'envelope',
  },
  {
    name: 'Customize Interface Panels',
    srn: 'gh/stoplightio/studio/docs/workflow/customize-interface.md',
    depth: 1,
    icon: 'star',
  },
  {
    name: 'Working with an Existing Project',
    srn: 'gh/stoplightio/studio/docs/workflow/working-with-existing-project.md',
    depth: 1,
    icon: 'book',
  },
  {
    name: 'Working with Files',
    srn: 'gh/stoplightio/studio/docs/workflow/working-with-files.md',
    depth: 1,
    icon: 'download',
  },
  {
    name: 'Working with Git',
    srn: 'gh/stoplightio/studio/docs/workflow/working-with-git.md',
    depth: 1,
    icon: 'code',
  },

  {
    name: 'Writing Tech Docs',
    depth: 0,
    type: 'group',
    icon: 'briefcase',
  },
  {
    name: 'Documentation Quickstart Guide',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/10-getting-started.md',
    depth: 1,
    icon: 'code',
  },
  {
    name: 'Directory Structure (Documentation)',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/directory-structure.md',
    depth: 1,
    icon: 'envelope',
  },
  {
    name: 'Linking Between Articles',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/linking-between-articles.md',
    depth: 1,
    icon: 'star',
  },
  {
    name: 'Publishing in Studio',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/publishing.md',
    depth: 1,
    icon: 'database',
  },
  {
    name: 'Using Markdown in Documentation',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/stoplight-flavored-markdown.md',
    depth: 1,
    icon: 'book',
  },
  {
    name: 'Using Images',
    srn: 'gh/stoplightio/studio/docs/writing-tech-docs/using-images.md',
    depth: 1,
    icon: 'folder-close',
  },
];
