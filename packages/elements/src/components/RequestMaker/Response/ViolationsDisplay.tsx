import { ITreeNode, Tree } from '@blueprintjs/core';
import { IPrismDiagnostic } from '@stoplight/prism-core';
import { Code, Icon } from '@stoplight/ui-kit';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { isEqual, uniq } from 'lodash';
import { useEffect, useState } from 'react';
import * as React from 'react';

type ViolationsDisplayProps = {
  violations: NonEmptyArray<IPrismDiagnostic>;
};

export const ViolationsDisplay: React.FC<ViolationsDisplayProps> = ({ violations }) => {
  const errorCount = violations.filter(v => v.severity === 0).length;
  const warningCount = violations.length - errorCount;

  const [tree, setTree] = useState<ITreeNode[]>([]);
  useEffect(() => {
    const headerElement = (
      <strong className="mb-1">
        <span className="inline mr-3">
          The returned response does not match the JSON Schema associated with the current operation.
        </span>
        {errorCount > 0 && (
          <span className="pr-3">
            <Icon icon="error" className="mr-2" />
            <span>{errorCount}</span>
          </span>
        )}
        {warningCount > 0 && (
          <span className="pr-3">
            <Icon icon="warning-sign" className="mr-1" />
            <span>{warningCount}</span>
          </span>
        )}
      </strong>
    );

    setTree([
      {
        id: 'root',
        isExpanded: false,
        label: headerElement,
        childNodes: buildTreeStructure(violations),
      },
    ]);
  }, [violations, errorCount, warningCount]);

  const refresh = () => setTree([...tree]);

  const handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    refresh();
  };

  const handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    refresh();
  };

  const handleNodeClick = (nodeData: ITreeNode) => {
    nodeData.isExpanded = !nodeData.isExpanded;
    refresh();
  };

  return (
    <section className="p-3 px-4 RequestMaker__ViolationsDisplay">
      <Tree
        contents={tree}
        onNodeCollapse={handleNodeCollapse}
        onNodeExpand={handleNodeExpand}
        onNodeClick={handleNodeClick}
      />
    </section>
  );
};

ViolationsDisplay.displayName = 'RequestMaker.ViolationsDisplay';

const buildTreeStructure = (
  violationsFlat: readonly IPrismDiagnostic[],
  parentPaths: string[] = [],
): Array<ITreeNode<IPrismDiagnostic>> => {
  const rootPaths = uniq(violationsFlat.map(v => (v.path && v.path[parentPaths.length]) || '').filter(v => !!v));

  return rootPaths.map(path => {
    const currentPathArray = [...parentPaths, path];
    const violationsOnPath = violationsFlat.filter(v => isEqual(v.path, currentPathArray));
    const violationsOnChildren = violationsFlat.filter(v =>
      isEqual(v.path?.slice(0, currentPathArray.length), currentPathArray),
    );
    return {
      id: currentPathArray.join('#'),
      label: <Code>{path}</Code>,
      childNodes: [
        ...violationsOnPath.map(createViolationTreeNode),
        ...buildTreeStructure(violationsOnChildren, currentPathArray),
      ],
      isExpanded: true,
    };
  });

  function createViolationTreeNode(violation: IPrismDiagnostic): ITreeNode<IPrismDiagnostic> {
    return {
      id: violation.path?.join('#') + violation.message,
      label: <em>{violation.message}</em>,
      nodeData: violation,
      isExpanded: true,
      icon: violation.severity === 0 ? 'error' : 'warning-sign',
    };
  }
};
