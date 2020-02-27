import { ITreeNode, Tree } from '@blueprintjs/core';
import { IPrismDiagnostic } from '@stoplight/prism-core';
import { Button, Code, Collapse } from '@stoplight/ui-kit';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { isEqual, uniq } from 'lodash';
import { useMemo, useState } from 'react';
import * as React from 'react';

type ViolationsDisplayProps = {
  violations: NonEmptyArray<IPrismDiagnostic>;
  defaultOpen?: boolean;
};

export const ViolationsDisplay: React.FC<ViolationsDisplayProps> = ({ violations, defaultOpen = true }) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const treeData = useMemo(() => buildViolationsTree(violations), [violations]);

  return (
    <section className="RequestMaker__ViolationsDisplay p-3 px-4">
      <strong className="mb-1">
        The returned response does not match the JSON Schema associated with the current operation.
        <Button icon={isOpen ? 'caret-up' : 'caret-down'} onClick={() => setOpen(!isOpen)} minimal />
      </strong>
      <Collapse isOpen={isOpen} transitionDuration={0}>
        <Tree contents={treeData} />
      </Collapse>
    </section>
  );
};

ViolationsDisplay.displayName = 'RequestMaker.ViolationsDisplay';

const buildViolationsTree = (
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
        ...buildViolationsTree(violationsOnChildren, currentPathArray),
      ],
      isExpanded: true,
      icon: 'document',
      hasCaret: false,
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
