import React from 'react';
import { stopPropagation } from './utils';
import { SelectionText } from './SelectionText';

export default function shortcuts(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  const api = new SelectionText(e.target as HTMLTextAreaElement);
  if (e.code && e.code.toLowerCase() === 'tab') {
    stopPropagation(e);
    if (api.start === api.end) {
      api.insertText('  ').position(api.start + 2, api.end + 2);
    } else if (api.getSelectedValue().indexOf('\n') > -1 && e.shiftKey) {
      api.lineStarRemove('  ');
    } else if (api.getSelectedValue().indexOf('\n') > -1) {
      api.lineStarInstert('  ');
    } else {
      api.insertText('  ').position(api.start + 2, api.end);
    }
    api.notifyChange();
  } else if (e.code && e.code.toLowerCase() === 'enter') {
    stopPropagation(e);
    const indent = `\n${api.getIndentText()}`;
    api.insertText(indent).position(api.start + indent.length, api.start + indent.length);
    api.notifyChange();
  } else if (
    e.code &&
    /^(quote|backquote|bracketleft|digit9|comma)$/.test(e.code.toLowerCase()) &&
    api.getSelectedValue()
  ) {
    stopPropagation(e);
    const val = api.getSelectedValue();
    let txt = '';
    switch (e.code.toLowerCase()) {
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
