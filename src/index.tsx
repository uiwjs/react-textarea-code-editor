import React, { useEffect, useMemo, useRef, useState } from 'react';
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
   * The minimum height of the editor. Default: `16`.
   */
  minHeight?: number;
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
    onChange,
    ...other
  } = props;

  const [value, setValue] = useState(props.value || '');
  useEffect(() => setValue(props.value || ''), [props.value]);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const contentStyle = {
    paddingTop: padding,
    paddingRight: padding,
    paddingBottom: padding,
    paddingLeft: padding,
  };

  const htmlStr = useMemo(
    () =>
      processHtml(
        `<pre aria-hidden=true><code ${language ? `class="language-${language}"` : ''} >${htmlEncode(
          String(value || ''),
        )}</code><br /></pre>`,
      ),
    [value, language],
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
          shortcuts(evn);
          other.onKeyDown && other.onKeyDown(evn);
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
