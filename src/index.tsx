import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { PluggableList } from 'unified';
import { processHtml, htmlEncode } from './utils';
import shortcuts from './shortcuts';
import * as styles from './styles';
import './style/index.less';

export * from './SelectionText';

export interface TextareaCodeEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  prefixCls?: string;
  /**
   * Set what programming language the code belongs to.
   */
  language?: string;
  /**
   * Optional padding for code. Default: `10`.
   */
  padding?: number;
  /**
   * rehypePlugins (Array.<Plugin>, default: `[[rehypePrism, { ignoreMissing: true }]]`)
   * List of [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins) to use. See the next section for examples on how to pass options
   */
  rehypePlugins?: PluggableList;
  /**
   * The minimum height of the editor. Default: `16`.
   */
  minHeight?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void | boolean;
}

export default React.forwardRef<HTMLTextAreaElement, TextareaCodeEditorProps>((props, ref) => {
  const {
    prefixCls = 'w-tc-editor',
    value: _,
    padding = 10,
    minHeight = 16,
    placeholder,
    language,
    className,
    style,
    rehypePlugins,
    onChange,
    ...other
  } = props;

  const [value, setValue] = useState(props.value || '');
  useEffect(
    () => setValue(props.value || ''),
    [props.value]
  );
  const textRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle<HTMLTextAreaElement, HTMLTextAreaElement>(ref, () => textRef.current!);

  const contentStyle = {
    paddingTop: padding,
    paddingRight: padding,
    paddingBottom: padding,
    paddingLeft: padding,
  };

  const htmlStr = useMemo(
    () =>
      processHtml(
        `<pre aria-hidden=true><code ${language && value ? `class="language-${language}"` : ''} >${htmlEncode(
          String(value || placeholder || ''),
        )}</code><br /></pre>`,
        rehypePlugins,
      ),
    [value, placeholder, language, rehypePlugins],
  );
  const preView = useMemo(
    () => (
      <div
        style={{ ...styles.editor, ...contentStyle, minHeight }}
        className={`${prefixCls}-preview ${language ? `language-${language}` : ''}`}
        dangerouslySetInnerHTML={{
          __html: htmlStr,
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefixCls, language, htmlStr],
  );

  return (
    <div style={{ ...styles.container, ...style }} className={`${prefixCls} ${className || ''}`}>
      <textarea
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize="off"
        {...other}
        placeholder={placeholder}
        onKeyDown={(evn) => {
          if (!other.onKeyDown || other.onKeyDown(evn) !== false) {
            shortcuts(evn);
          }
        }}
        style={{
          ...styles.editor,
          ...styles.textarea,
          ...contentStyle,
          minHeight,
          ...(placeholder && !value ? { WebkitTextFillColor: 'inherit' } : {}),
        }}
        ref={textRef}
        onChange={(evn) => {
          setValue(evn.target.value);
          onChange && onChange(evn);
        }}
        className={`${prefixCls}-text`}
        value={value}
      />
      {preView}
    </div>
  );
});
