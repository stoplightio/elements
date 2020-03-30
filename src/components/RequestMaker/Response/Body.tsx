import { Radio, RadioGroup } from '@blueprintjs/core';
import { MarkdownViewer } from '@stoplight/markdown-viewer';
import cn from 'classnames';
import { isNonEmpty } from 'fp-ts/lib/Array';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useRequestMakerStore } from '../../../hooks/useRequestMaker';
import { ErrorViewer } from './ErrorViewer';
import { HTMLViewer } from './HTMLViewer';
import { ImageViewer } from './ImageViewer';
import { JsonViewer } from './JsonViewer';
import { PrettyViewer } from './PrettyViewer';
import { RawViewer } from './RawViewer';
import { ViolationsDisplay } from './ViolationsDisplay';

type ViewCategory = 'raw' | 'pretty' | 'rendered';

export const ResponseBody = observer<{ className?: string }>(({ className }) => {
  const { body, error, responseType, bodyJson, violations } = useRequestMakerStore('response');
  const [selectedView, setSelectedView] = React.useState<ViewCategory>(responseType === 'img' ? 'rendered' : 'pretty');

  React.useEffect(() => {
    if (responseType === 'img') {
      setSelectedView('rendered');
    }
  }, [responseType]);

  let content;

  if (error) {
    content = <ErrorViewer error={error} />;
  } else if (selectedView === 'rendered') {
    switch (responseType) {
      case 'json':
        content = <JsonViewer node={bodyJson} expandedDepth={2} />;
        break;
      case 'html':
        content = <HTMLViewer srcDoc={body} />;
        break;
      case 'md':
        content = <MarkdownViewer className="m-4" markdown={body} />;
        break;
      case 'img':
        content = <ImageViewer dataUri={body} />;
        break;
      default:
        content = <div className="text-center p-10 text-gray-6">{responseType || 'Response type'} not supported</div>;
        break;
    }
  } else if (responseType === 'img') {
    content = (
      <div className="text-center p-10 text-gray-6">
        This request has no raw data available. Try the{' '}
        <span className="text-blue underline cursor-pointer" onClick={() => setSelectedView('rendered')}>
          rendered view
        </span>
        .
      </div>
    );
  } else if (selectedView === 'pretty') {
    content = <PrettyViewer response={error || body} type={responseType} />;
  } else {
    content = <RawViewer content={body} type={responseType} />;
  }

  const onChange = React.useCallback((e) => setSelectedView(e.currentTarget.value), []);
  const bodyViolations = violations.filter((v) => v.path && v.path[0] === 'body');

  const shouldShowViewSelector = !error;

  return (
    <div className={cn(className, 'RequestMaker__ResponseBody flex flex-col')}>
      {shouldShowViewSelector && <ViewSelectorRadioGroup selectedView={selectedView} onChange={onChange} />}
      {isNonEmpty(bodyViolations) && <ViolationsDisplay violations={bodyViolations} />}
      <div className="RequestMaker__ResponseBody--content flex-1 border-t">{content}</div>
    </div>
  );
});
ResponseBody.displayName = 'RequestMaker.ResponseBody';

type ViewSelectorRadioGroupProps = {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  selectedView: string;
};

const ViewSelectorRadioGroup: React.FC<ViewSelectorRadioGroupProps> = ({ onChange, selectedView }) => (
  <RadioGroup
    className="RequestMaker__ResponseBody--type mx-5 mt-3"
    inline
    onChange={onChange}
    selectedValue={selectedView}
  >
    <Radio label="raw" value="raw" />
    <Radio label="pretty" value="pretty" />
    <Radio label="rendered" value="rendered" />
  </RadioGroup>
);
