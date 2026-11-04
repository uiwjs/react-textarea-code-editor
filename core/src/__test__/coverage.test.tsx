import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextareaCodeEditor from '../';
import NoHighlightEditor from '../index.nohighlight';
import shortcuts from '../shortcuts';
import { SelectionText } from '../SelectionText';
import { htmlEncode, processHtml } from '../utils';

function mountTextarea(value: string, start: number, end = start) {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.setSelectionRange(start, end);
  return textarea;
}

it('TextareaCodeEditor readOnly ignores keyboard shortcuts', () => {
  const onKeyDown = jest.fn();
  render(<TextareaCodeEditor readOnly onKeyDown={onKeyDown} data-testid="textbox" value="const a = 1;" autoFocus />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textbox');
  textbox.setSelectionRange(0, 0);
  fireEvent.keyDown(textbox, { key: 'Tab', code: 'Tab', charCode: 9 });
  expect(onKeyDown).not.toHaveBeenCalled();
  expect(textbox).toHaveValue('const a = 1;');
});

it('TextareaCodeEditor skips shortcuts when onKeyDown returns false', () => {
  const onKeyDown = jest.fn(() => false);
  render(<TextareaCodeEditor onKeyDown={onKeyDown} data-testid="textbox" value="const a = 1;" autoFocus />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textbox');
  textbox.setSelectionRange(0, 0);
  fireEvent.keyDown(textbox, { key: 'Tab', code: 'Tab', charCode: 9 });
  expect(onKeyDown).toHaveBeenCalledTimes(1);
  expect(textbox).toHaveValue('const a = 1;');
});

it('TextareaCodeEditor Shift+Tab removes indent at a collapsed caret', () => {
  const example = '  const value = 1;';
  render(<TextareaCodeEditor language="js" data-testid="textbox" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textbox');
  textbox.setSelectionRange(4, 4);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: 'Tab',
    code: 'Tab',
    charCode: 9,
    shiftKey: true,
  });
  expect(textbox).toHaveValue('const value = 1;');
});

it('TextareaCodeEditor indentWidth 0 does not insert or remove indent', () => {
  const example = 'const a = 1;\nconst b = 2;';
  render(<TextareaCodeEditor indentWidth={0} data-testid="textbox" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textbox');

  textbox.setSelectionRange(0, example.length);
  textbox.focus();
  fireEvent.keyDown(textbox, { key: 'Tab', code: 'Tab', charCode: 9 });
  expect(textbox).toHaveValue(example);

  textbox.setSelectionRange(2, 2);
  textbox.focus();
  fireEvent.keyDown(textbox, { key: 'Tab', code: 'Tab', charCode: 9, shiftKey: true });
  expect(textbox).toHaveValue(example);
});

it('TextareaCodeEditor nohighlight renders without prism tokens', () => {
  const ref = React.createRef<HTMLTextAreaElement>();
  const { container } = render(
    <NoHighlightEditor ref={ref} language="js" data-testid="textbox" value="const a = 1;" />,
  );
  const textbox = screen.getByTestId('textbox');
  expect(textbox).toHaveValue('const a = 1;');
  expect(ref.current).toBe(textbox);
  expect(container.querySelector('.w-tc-editor-preview')?.innerHTML).not.toContain('token');
});

it('processHtml uses an empty plugin list by default', () => {
  expect(processHtml('<span>ok</span>')).toBe(processHtml('<span>ok</span>', []));
});

it('htmlEncode escapes markup once, including text inside fenced code blocks', () => {
  expect(htmlEncode('```tsx\nconst x = "<div>&";\n```')).toBe('```tsx\nconst x = &quot;&lt;div>&amp;&quot;;\n```');
});

it('shortcuts uses nativeEvent.code and the default indent width', () => {
  const textarea = mountTextarea('a', 0, 0);
  const preventDefault = jest.fn();
  const stopPropagation = jest.fn();
  shortcuts({
    code: '',
    nativeEvent: { code: 'Tab' },
    shiftKey: false,
    target: textarea,
    preventDefault,
    stopPropagation,
  } as unknown as React.KeyboardEvent<HTMLTextAreaElement>);
  expect(textarea.value).toBe('  a');
  expect(textarea.selectionStart).toBe(2);
  expect(textarea.selectionEnd).toBe(2);
  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(stopPropagation).toHaveBeenCalledTimes(1);
  textarea.remove();
});

it('SelectionText getSelectedValue accepts an explicit end', () => {
  const textarea = mountTextarea('abcdef', 1, 3);
  const api = new SelectionText(textarea);
  // A finite end takes the true branch, and that branch slices through `start`.
  expect(api.getSelectedValue(undefined, 5)).toBe('bcdef');
  expect(api.getSelectedValue(1, 4)).toBe('');
  expect(api.getSelectedValue(2, Number.NaN)).toBe('c');
  textarea.remove();
});

it('SelectionText ignores an empty indent', () => {
  const textarea = mountTextarea('a\nb', 0, 3);
  const api = new SelectionText(textarea);
  expect(api.lineStarInstert('')).toBe(api);
  api.lineStarRemove('');
  expect(textarea.value).toBe('a\nb');
  expect(textarea.selectionStart).toBe(0);
  expect(textarea.selectionEnd).toBe(3);
  textarea.remove();
});
