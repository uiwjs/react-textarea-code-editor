import React from 'react';
import { Pluggable } from 'unified';
import Editor, { TextareaCodeEditorProps } from './Editor';
import rehypePrism from 'rehype-prism-plus';

export * from './Editor';

export default React.forwardRef<HTMLTextAreaElement, TextareaCodeEditorProps>((props, ref) => {
  const { rehypePlugins = [[rehypePrism, { ignoreMissing: true }]] as Pluggable[], ...reset } = props;
  return <Editor {...reset} rehypePlugins={rehypePlugins} ref={ref} />;
});
