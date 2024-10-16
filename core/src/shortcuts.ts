import React from 'react';
import { stopPropagation } from './utils';
import { SelectionText } from './SelectionText';

export default function shortcuts(e: React.KeyboardEvent<HTMLTextAreaElement>, indentWidth: number = 2) {
  const api = new SelectionText(e.target as HTMLTextAreaElement);
  /**
   * Support of shortcuts for React v16
   * https://github.com/uiwjs/react-textarea-code-editor/issues/128
   * https://blog.saeloun.com/2021/04/23/react-keyboard-event-code.html
   */
  const code = (e.code || e.nativeEvent.code).toLocaleLowerCase();
  const indent = ' '.repeat(indentWidth);

  if (code === 'tab') {
    stopPropagation(e);
    if (api.start === api.end) {
      if (e.shiftKey) {
        api.lineStarRemove(indent);
      } else {
        api.insertText(indent).position(api.start + indentWidth, api.end + indentWidth);
      }
    } else if (api.getSelectedValue().indexOf('\n') > -1 && e.shiftKey) {
      api.lineStarRemove(indent);
    } else if (api.getSelectedValue().indexOf('\n') > -1) {
      api.lineStarInstert(indent);
    } else {
      api.insertText(indent).position(api.start + indentWidth, api.end);
    }
    api.notifyChange();
  } else if (code === 'enter') {
    stopPropagation(e);
    const indent = `\n${api.getIndentText()}`;
    api.insertText(indent).position(api.start + indent.length, api.start + indent.length);
    api.notifyChange();
  } else if (code && /^(quote|backquote|bracketleft|digit9|comma)$/.test(code) && api.getSelectedValue()) {
    stopPropagation(e);
    const val = api.getSelectedValue();
    let txt = '';
    switch (code) {
      case 'quote':
        txt = `'${val}'`;
        if (e.shiftKey) {
          txt = `"${val}"`;
        }
        break;
      case 'backquote':
        txt = `\`${val}\``;
        break;
      case 'bracketleft':
        txt = `[${val}]`;
        if (e.shiftKey) {
          txt = `{${val}}`;
        }
        break;
      case 'digit9':
        txt = `(${val})`;
        break;
      case 'comma':
        txt = `<${val}>`;
        break;
    }
    api.insertText(txt);
    api.notifyChange();
  }
}
