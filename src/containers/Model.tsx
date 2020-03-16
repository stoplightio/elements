import * as React from 'react';

import { IModelProps as IModelComponentProps, Model as ModelComponent } from '../components/Model';
import { useNodeInfo } from '../hooks';

export interface IModelProps {
  workspace: string;
  project: string;
  uri: string;
  branch: string;
  name: string;
  actions: IModelComponentProps['actions'];
}

export const Model = ({ workspace, project, uri, branch, actions }: IModelProps) => {
  const { data, isValidating } = useNodeInfo(uri, { workspace, project, branch });

  if (!data || isValidating) {
    // Could probably show a loading spinner here instead of returning null
    return null;
  }

  return (
    <ModelComponent
      className="bg-white border dark:border-darken-3 dark:bg-gray-7"
      title={name}
      value={data}
      maxRows={10}
      actions={actions}
    />
  );
};
