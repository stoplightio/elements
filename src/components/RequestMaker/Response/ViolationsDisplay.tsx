import { ITreeNode, Tree } from '@blueprintjs/core';
import { IPrismDiagnostic } from '@stoplight/prism-core';
import { Button, Code, Collapse, Icon } from '@stoplight/ui-kit';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { isEqual, uniq } from 'lodash';
import { useEffect, useState } from 'react';
import * as React from 'react';

type ViolationsDisplayProps = {
  violations: NonEmptyArray<IPrismDiagnostic>;
  defaultOpen?: boolean;
};

export const ViolationsDisplay: React.FC<ViolationsDisplayProps> = ({ violations, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const errorCount = violations.filter(v => v.severity === 0).length;
  const warningCount = violations.length - errorCount;

  return (
    <section className="RequestMaker__ViolationsDisplay p-3 px-4">
      <Button rightIcon={isOpen ? 'caret-up' : 'caret-down'} onClick={() => setOpen(!isOpen)} minimal>
        <strong className="mb-1">
          {errorCount > 0 && (
            <span className="pr-3">
              <Icon icon="error" className="mr-1" />
              <span>{errorCount}</span>
            </span>
          )}
          {warningCount > 0 && (
            <span className="pr-3">
              <Icon icon="warning-sign" className="mr-1" />
              <span>{warningCount}</span>
            </span>
          )}
          The returned response does not match the JSON Schema associated with the current operation.
        </strong>
      </Button>
      <Collapse isOpen={isOpen} transitionDuration={0}>
        <ViolationsTree violations={violations} />
      </Collapse>
    </section>
  );
};

ViolationsDisplay.displayName = 'RequestMaker.ViolationsDisplay';

type ViolationsTreeProps = {
  violations: readonly IPrismDiagnostic[];
} & Omit<React.ComponentPropsWithoutRef<typeof Tree>, 'contents'>;

const ViolationsTree: React.FC<ViolationsTreeProps> = ({ violations, ...rest }) => {
  const [tree, setTree] = useState<ITreeNode[]>([]);
  useEffect(() => {
    setTree(buildTreeStructure(violations));
  }, [violations]);

  const refresh = () => {
    setTree([...tree]);
  };

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
    <Tree
      contents={tree}
      {...rest}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      onNodeClick={handleNodeClick}
    />
  );
};

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
