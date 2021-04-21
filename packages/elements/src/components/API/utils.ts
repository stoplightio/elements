import { NodeType } from '@stoplight/types';

import { OperationNode, ServiceNode } from '../../utils/oas/types';

export type TagGroup = { title: string; items: OperationNode[] };

export const computeTagGroups = (serviceNode: ServiceNode) => {
  const groupsByTagId: { [tagId: string]: TagGroup } = {};
  const ungrouped = [];

  const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());

  for (const node of serviceNode.children) {
    if (node.type !== NodeType.HttpOperation) continue;
    const tagName = node.tags[0];

    if (tagName) {
      const tagId = tagName.toLowerCase();
      if (groupsByTagId[tagId]) {
        groupsByTagId[tagId].items.push(node);
      } else {
        const serviceTagName = lowerCaseServiceTags.find(tn => tn === tagId);
        groupsByTagId[tagId] = {
          title: serviceTagName || tagName,
          items: [node],
        };
      }
    } else {
      ungrouped.push(node);
    }
  }

  const orderedTagGroups = Object.entries(groupsByTagId)
    .sort(([g1], [g2]) => {
      const g1LC = g1.toLowerCase();
      const g2LC = g2.toLowerCase();
      const g1Idx = lowerCaseServiceTags.findIndex(tn => tn === g1LC);
      const g2Idx = lowerCaseServiceTags.findIndex(tn => tn === g2LC);

      // Move not-tagged groups to the bottom
      if (g1Idx < 0 && g2Idx < 0) return 0;
      if (g1Idx < 0) return 1;
      if (g2Idx < 0) return -1;

      // sort tagged groups according to the order found in HttpService
      return g1Idx - g2Idx;
    })
    .map(([, tagGroup]) => tagGroup);

  return { groups: orderedTagGroups, ungrouped };
};
