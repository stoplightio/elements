import 'quill/dist/quill.snow.css';
import './YQuill.scss';

import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import * as React from 'react';
import type { Awareness } from 'y-protocols/awareness';
import { QuillBinding } from 'y-quill';
import type * as Y from 'yjs';

Quill.register('modules/cursors', QuillCursors);

export type YQuillProps = {
  type: Y.Text;
  awareness?: Awareness;
};

export const YQuill = React.memo(({ type, awareness }: YQuillProps) => {
  console.log('render agh');
  // const type = ydoc.getText('quill');

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    var editor;
    setTimeout(() => {
      if (!ref.current) return;
      editor = new Quill(ref.current, {
        modules: {
          cursors: true,
          toolbar: false,
        },
        placeholder: 'Start collaborating...',
        theme: 'snow', // or 'bubble'
      });

      // Optionally specify an Awareness instance, if supported by the Provider
      new QuillBinding(type, editor, awareness);
    }, 0);
  });

  return <div ref={ref} className="mb-4"></div>;
});
