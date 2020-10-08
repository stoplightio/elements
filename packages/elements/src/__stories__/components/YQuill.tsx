import 'quill/dist/quill.snow.css';
import './YQuill.scss';

import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import * as React from 'react';
import { QuillBinding } from 'y-quill';
import type * as Y from 'yjs';

Quill.register('modules/cursors', QuillCursors);

export const YQuill = React.memo(({ type }: { type: Y.Text }) => {
  console.log('render agh');
  // const type = ydoc.getText('quill');

  const ref = React.useRef();

  React.useEffect(() => {
    var editor;
    setTimeout(() => {
      // debugger;
      editor = new Quill(ref.current, {
        modules: {
          cursors: true,
          toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['image', 'code-block']],
        },
        placeholder: 'Start collaborating...',
        theme: 'snow', // or 'bubble'
      });

      // Optionally specify an Awareness instance, if supported by the Provider
      const binding = new QuillBinding(type, editor); //, provider.awareness);
    }, 0);
  });

  return <div ref={ref} className="mb-4"></div>;
});
