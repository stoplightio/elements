import { useBundleRefsIntoDocument, useParsedValue } from '@jpmorganchase/elemental-core';

import { computeAPITree } from '../../components/API/utils';
import { transformOasToServiceNode } from '../../utils/oas';
import { ServiceNode } from '../../utils/oas/types';

export const useGetOasNavTree = (apiDescriptionDocument: unknown) => {
  const parsedDocument = useParsedValue(apiDescriptionDocument);
  const bundledDocument = useBundleRefsIntoDocument(parsedDocument);

  const groupSchemas = (tree: any) => {
    const targetTitle = 'Schemas';
    // Use Array.reduce to process the array
    const newTree = tree.reduce((accumulator: any, currentObject: any) => {
      // Check if the current object has the target title
      if (currentObject.title === targetTitle) {
        // Check if the current object has the target id
        accumulator.matchedObject = currentObject;
      } else if (currentObject.id?.includes(targetTitle.toLowerCase())) {
        // Check if 'matchedObjects' key exists, and if not, create an empty array
        accumulator.matchedObject.items = accumulator.matchedObject.items || [];
        // Push the current object to the 'matchedObjects' array
        accumulator.matchedObject.items.push(currentObject);
      } else {
        accumulator.others = accumulator.others || [];
        // Push the current object to the 'matchedObjects' array
        accumulator.others.push(currentObject);
      }
      return accumulator;
    }, {});

    const navTree = [...newTree.others, newTree.matchedObject];
    return navTree;
  };

  const apiTree = computeAPITree(transformOasToServiceNode(bundledDocument) as ServiceNode);
  return groupSchemas(apiTree);
};
