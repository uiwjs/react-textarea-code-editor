import React, { useEffect, useRef } from 'react';
import TestRenderer from 'react-test-renderer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TextareaCodeEditor from '../';

it('Should output a TextareaCodeEditor', async () => {
  const component = TestRenderer.create(<TextareaCodeEditor placeholder="Please enter JS code." />);
  let tree = component.toJSON();
  if (tree && !Array.isArray(tree)) {
    expect(tree.type).toEqual('div');
    expect(tree.props.disabled).toBeFalsy();
    expect(tree.props.className).toEqual('w-tc-editor ');
    expect(tree.props.style).toEqual({
      position: 'relative',
      textAlign: 'left',
      boxSizing: 'border-box',
      padding: 0,
      overflow: 'hidden',
    });
  }
  render(
    <TextareaCodeEditor
      language="html"
      data-testid="textbox"
      autoFocus
      value="function add(a, b) {\n  return a + b;\n}"
    />,
  );
  const textbox = screen.getByTestId('textbox');
  expect(textbox).toHaveStyle({
    margin: '0px',
    border: '0px',
    background: 'none',
    'box-sizing': 'inherit',
    display: 'inherit',
    'font-family': 'inherit',
    // 'font-size': 'inherit',
    'font-style': 'inherit',
    'font-variant-ligatures': 'inherit',
    'font-weight': 'inherit',
    'letter-spacing': 'inherit',
    'line-height': 'inherit',
    'tab-size': 'inherit',
    'text-indent': 'inherit',
    'text-rendering': 'inherit',
    'text-transform': 'inherit',
    'white-space': 'pre-wrap',
    'word-break': 'keep-all',
    'overflow-wrap': 'break-word',
    outline: 0,
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%',
    resize: 'none',
    // color: 'inherit',
    opacity: 0.8,
    overflow: 'hidden',
    // '-webkit-font-smoothing': 'antialiased',
    // '-webkit-text-fill-color': 'transparent',
    padding: '10px 10px 10px 10px',
    // 'minHeight:': '16px',
    // 'min-height:': '80px',
  });
});

it('TextareaCodeEditor language="html"', async () => {
  render(
    <TextareaCodeEditor
      language="html"
      autoFocus
      data-testid="textarea"
      value="function add(a, b) {\n  return a + b;\n}"
    />,
  );
  const textbox = screen.getByRole('textbox');
  expect(textbox.getAttribute('style')).toEqual(
    'margin: 0px; border: 0px; background: none; box-sizing: inherit; display: inherit; font-family: inherit; font-style: inherit; font-variant-ligatures: inherit; font-weight: inherit; letter-spacing: inherit; line-height: inherit; tab-size: inherit; text-indent: inherit; text-rendering: inherit; text-transform: inherit; white-space: pre-wrap; word-break: keep-all; overflow-wrap: break-word; outline: 0; position: absolute; top: 0px; left: 0px; height: 100%; width: 100%; resize: none; opacity: 0.8; overflow: hidden; padding: 10px 10px 10px 10px; min-height: 16px;',
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(textbox.nextElementSibling?.getAttribute('style')).toEqual(
    'margin: 0px; border: 0px; background: none; box-sizing: inherit; display: inherit; font-family: inherit; font-style: inherit; font-variant-ligatures: inherit; font-weight: inherit; letter-spacing: inherit; line-height: inherit; tab-size: inherit; text-indent: inherit; text-rendering: inherit; text-transform: inherit; white-space: pre-wrap; word-break: keep-all; overflow-wrap: break-word; outline: 0; padding: 10px 10px 10px 10px; min-height: 16px;',
  );
  const component = TestRenderer.create(
    <TextareaCodeEditor language="html" data-testid="textarea" onChange={() => {}} value="<div>Hello World!</div>" />,
  );
  let tree = component.toJSON();
  if (tree && !Array.isArray(tree)) {
    expect(tree.type).toEqual('div');
    expect(tree.props.disabled).toBeFalsy();
    expect(tree.props.className).toEqual('w-tc-editor ');
    expect(tree.props.style).toEqual({
      position: 'relative',
      textAlign: 'left',
      boxSizing: 'border-box',
      padding: 0,
      overflow: 'hidden',
    });
  }
});

it('TextareaCodeEditor onChange 1', async () => {
  const MyComponent = () => {
    const txtRef = useRef<HTMLTextAreaElement>(null);
    const [code] = React.useState(`function add(a, b) {\n  return a + b;\n}`);
    useEffect(() => {
      expect(txtRef.current?.getAttribute('autoCorrect')).toEqual('off');
    });
    return (
      <TextareaCodeEditor
        language="js"
        value={code}
        ref={txtRef}
        onChange={(evn) => {
          expect(evn.target.value).toEqual('a');
        }}
      />
    );
  };
  render(<MyComponent />);
});

it('TextareaCodeEditor onChange', async () => {
  const onChange = jest.fn<undefined, [React.ChangeEvent]>();
  render(
    <TextareaCodeEditor
      language="js"
      data-testid="textarea"
      onChange={onChange}
      autoFocus
      value="function add(a, b) {\n  return a + b;\n}"
    />,
  );
  const textarea = screen.getAllByTestId('textarea');
  textarea[0].focus();
  fireEvent.input(textarea[0], { target: { value: 'a' } });
  expect(textarea[0]).toHaveValue(`a`);
});

// it('TextareaCodeEditor Tab Input', async () => {
//   const onKeyDown = jest.fn<boolean, [React.KeyboardEvent]>();
//   render(
//     <TextareaCodeEditor
//       language="js"
//       data-testid="textarea"
//       onKeyDown={onKeyDown}
//       autoFocus
//       value="console.log('This is a bad example')"
//     />,
//   );
//   const textarea = screen.getAllByTestId<HTMLTextAreaElement>('textarea');
//   userEvent.type(textarea[0], '{backspace}good')
//   expect(textarea[0]).toHaveValue(`console.log('This is a good example')`);
// });

it('TextareaCodeEditor onKeyDown Tab Input', async () => {
  const onKeyDown = jest.fn<boolean, [React.KeyboardEvent]>();
  render(
    <TextareaCodeEditor
      language="js"
      data-testid="textarea"
      autoFocus
      placeholder="Please enter JS code."
      value=""
      onKeyDown={onKeyDown}
    />,
  );
  const textarea = screen.getByPlaceholderText('Please enter JS code.');
  // console.log(textarea.value);
  // const signinModal = document.getElementsByTagName('textarea');
  // console.log('firstChild', textarea)
  fireEvent.input(textarea, { target: { value: 'This is a bad example' } });
  expect(textarea).toHaveFocus();
  expect(textarea).toHaveValue('This is a bad example');

  const elmTextarea = screen.getByDisplayValue('This is a bad example');
  (elmTextarea as HTMLTextAreaElement).setSelectionRange(1, 1);
  elmTextarea.focus();
  await waitFor(async () => {
    await userEvent.keyboard('a');
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    // expect(onKeyDown.mock.calls[0][0]).toHaveProperty('keyCode', 97);
    await userEvent.keyboard('[Enter]');
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    // expect(onKeyDown.mock.calls[1][0]).toHaveProperty('keyCode', 13);
  });

  elmTextarea.focus();
  expect(elmTextarea).toHaveValue('Ta\nhis is a bad example');

  elmTextarea.focus();
  await (elmTextarea as HTMLTextAreaElement).setSelectionRange(1, 1);
  fireEvent.keyDown(elmTextarea, {
    key: 'Tab',
    code: 'Tab',
    charCode: 9,
  });
  // ⚠️ ============================================================
  // await userEvent.keyboard('{Tab}{f}{o}{o}');
  expect(elmTextarea).toHaveValue('T  a\nhis is a bad example');
});

it('TextareaCodeEditor Tab2', async () => {
  const example = `function add(a, b)`;
  const expected = `function  add(a, b)`;
  render(<TextareaCodeEditor language="js" data-testid="textbox" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textbox');
  expect(textbox).toHaveFocus();
  textbox.setSelectionRange(8, 9);
  fireEvent.keyDown(textbox, {
    key: 'Tab',
    code: 'Tab',
    charCode: 9,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor Tab', async () => {
  const example = `function add(a, b) {\n  return a + b;\n}`;
  const expected = `  function add(a, b) {\n    return a + b;\n}`;
  render(<TextareaCodeEditor language="js" data-testid="textbox" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textbox');
  expect(textbox).toHaveFocus();
  textbox.setSelectionRange(5, 26);
  fireEvent.keyDown(textbox, {
    key: 'Tab',
    code: 'Tab',
    charCode: 9,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Tab One-Line input', async () => {
  const example = `console.log('This is a bad example')\nconsole.log('This is a good example')`;
  const expected = `console.log('This is a bad example')\n  console.log('This is a good example')`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(37, 37);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: 'Tab',
    code: 'Tab',
    charCode: 9,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Tab Multi-Line Input', async () => {
  const example = `\nfunction stopPropagation(e) {\n  e.stopPropagation();\n  e.preventDefault();\n}`;
  const expected = `\nfunction stopPropagation(e) {\ne.stopPropagation();\ne.preventDefault();\n}`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(38, 67);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: 'Tab',
    code: 'Tab',
    charCode: 9,
    shiftKey: true,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Tab Multi-Line 2 Input', async () => {
  const example = `\nfunction stopPropagation(e) {\n  e.stopPropagation();\n  e.preventDefault();\n}`;
  const expected = `\nfunction stopPropagation(e) {\ne.stopPropagation();\ne.preventDefault();\n}`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(6, 67);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: 'Tab',
    code: 'Tab',
    charCode: 9,
    shiftKey: true,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Enter Input', async () => {
  const example = `\nfunction stopPropagation(e) {\n  e.stopPropagation();\n  e.preventDefault();\n}`;
  const expected = `\nfunction stopPropagation(e) {\n \n  e.stopPropagation();\n  e.preventDefault();\n}`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(32, 32);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: 'Enter',
    code: 'Enter',
    charCode: 13,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Input `()`', async () => {
  const example = `/** Hello Wold **/`;
  const expected = `/** (Hello) Wold **/`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(4, 9);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: '(',
    code: 'Digit9',
    charCode: 57,
    shiftKey: true,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Input `<>`', async () => {
  const example = `/** Hello World **/`;
  const expected = `/** <Hello> World **/`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(4, 9);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: '[',
    code: 'Comma',
    charCode: 188,
    shiftKey: true,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Input `[]`', async () => {
  const example = `/** Hello World **/`;
  const expected = `/** [Hello] World **/`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(4, 9);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: '[',
    code: 'BracketLeft',
    charCode: 219,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Input `{}`', async () => {
  const example = `/** Hello World **/`;
  const expected = `/** {Hello} World **/`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(4, 9);
  textbox.focus();
  // userEvent.keyboard(`{Shift>}'{/Shift}`)
  fireEvent.keyDown(textbox, {
    key: '{',
    code: 'BracketLeft',
    charCode: 219,
    shiftKey: true,
  });
  expect(textbox).toHaveValue(expected);
});

it("TextareaCodeEditor onKeyDown Input ~ `''`", async () => {
  const example = `/** Hello World **/`;
  const expected = `/** 'Hello' World **/`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(4, 9);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: '"',
    code: 'Quote',
    charCode: 222,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Input `""`', async () => {
  const example = `/** Hello World **/`;
  const expected = `/** "Hello" World **/`;
  render(<TextareaCodeEditor language="js" data-testid="textarea" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textarea');
  textbox.setSelectionRange(4, 9);
  textbox.focus();
  fireEvent.keyDown(textbox, {
    key: '"',
    code: 'Quote',
    charCode: 222,
    shiftKey: true,
  });
  expect(textbox).toHaveValue(expected);
});

it('TextareaCodeEditor onKeyDown Input ``', async () => {
  const example = `/** Hello World **/`;
  const expected = `/** \`Hello\` World **/`;
  render(<TextareaCodeEditor language="js" data-testid="textbox" autoFocus value={example} />);
  const textbox = screen.getByTestId<HTMLTextAreaElement>('textbox');
  textbox.setSelectionRange(4, 9);
  textbox.focus();
  fireEvent.keyDown(textbox || document.body, {
    key: '`',
    code: 'Backquote',
    charCode: 192,
  });
  expect(textbox).toHaveValue(expected);
});
