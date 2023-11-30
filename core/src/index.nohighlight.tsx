import React from 'react';
import Editor, { TextareaCodeEditorProps } from './Editor';

export * from './Editor';

export default React.forwardRef<HTMLTextAreaElement, TextareaCodeEditorProps>((props, ref) => {
  return <Editor {...props} ref={ref} />;
});
