/* eslint-disable jest/no-conditional-expect */
import React, { useRef } from 'react';
import TestRenderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
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
    expect(tree.children!.length).toEqual(2);
    tree.children!.forEach((child) => {
      if (typeof child === 'object') {
        expect(/^(div|textarea)$/.test(child.type || '')).toBeTruthy();
        if (child.type === 'textarea') {
          expect(child.props.placeholder).toEqual('Please enter JS code.');
          expect(child.props.autoComplete).toEqual('off');
          expect(child.props.autoCorrect).toEqual('off');
          expect(child.props.spellCheck).toEqual('false');
          expect(child.props.autoCapitalize).toEqual('off');
          expect(child.props.className).toEqual('w-tc-editor-text');
        }
      }
    });
  }
});

it('TextareaCodeEditor language="html"', async () => {
  const component = TestRenderer.create(
    <TextareaCodeEditor language="html" onChange={() => {}} value="<div>Hello World!</div>" />,
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
    expect(tree.children!.length).toEqual(2);
    tree.children!.forEach((child) => {
      if (typeof child === 'object') {
        expect(/^(div|textarea)$/.test(child.type || '')).toBeTruthy();
        if (child.type === 'textarea') {
          expect(child.props.autoComplete).toEqual('off');
          expect(child.props.autoCorrect).toEqual('off');
          expect(child.props.spellCheck).toEqual('false');
          expect(child.props.autoCapitalize).toEqual('off');
          expect(child.props.className).toEqual('w-tc-editor-text');
        }
        if (child.type === 'div') {
          expect(child.props.style).toEqual({
            background: 'none',
            border: 0,
            boxSizing: 'inherit',
            display: 'inherit',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontStyle: 'inherit',
            fontVariantLigatures: 'inherit',
            fontWeight: 'inherit',
            letterSpacing: 'inherit',
            lineHeight: 'inherit',
            margin: 0,
            minHeight: 16,
            outline: 0,
            overflowWrap: 'break-word',
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            tabSize: 'inherit',
            textIndent: 'inherit',
            textRendering: 'inherit',
            textTransform: 'inherit',
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
          });
          expect(child.props.className).toEqual('w-tc-editor-preview language-html');
          expect(typeof child.props.dangerouslySetInnerHTML).toEqual('object');
        }
      }
    });
  }
});

it('TextareaCodeEditor onChange', async () => {
  const MyComponent = () => {
    const txtRef = useRef<HTMLTextAreaElement>(null);
    const [code] = React.useState(`function add(a, b) {\n  return a + b;\n}`);
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

  const {
    container: { firstChild },
  } = render(<MyComponent />);
  if (firstChild && firstChild.firstChild) {
    fireEvent.input(firstChild.firstChild, { target: { value: 'a' } });
  }
});

it('TextareaCodeEditor Tab Input', async () => {
  const {
    container: { firstChild },
  } = render(
    <TextareaCodeEditor language="js" data-testid="textarea" autoFocus value="console.log('This is a bad example')" />,
  );

  if (firstChild && firstChild.firstChild) {
    (firstChild.firstChild as any).setSelectionRange(23, 26);
    userEvent.type(firstChild.firstChild as any, '{backspace}good');

    expect(firstChild.firstChild).toHaveFocus();
    expect(firstChild.firstChild).toHaveValue(`console.log('This is a good example')`);
    fireEvent.keyDown(firstChild.firstChild, {
      key: 'Tab',
      code: 'Tab',
      charCode: 9,
    });
  }
});

it('TextareaCodeEditor onKeyDown Tab Input', async () => {
  const {
    container: { firstChild },
  } = render(
    <TextareaCodeEditor
      language="js"
      data-testid="textarea"
      autoFocus
      value="console.log('This is a bad example')"
      onKeyDown={(evn) => {
        expect(evn.code.toLowerCase()).toEqual('tab');
        expect((evn.target as any).value).toEqual(`console.log('This is a    example')`);
      }}
    />,
  );

  if (firstChild && firstChild.firstChild) {
    (firstChild.firstChild as any).setSelectionRange(23, 26);
    fireEvent.keyDown(firstChild.firstChild, {
      key: 'Tab',
      code: 'Tab',
      charCode: 9,
    });
  }
});

it('TextareaCodeEditor onKeyDown Tab One-Line Input', async () => {
  const {
    container: { firstChild },
  } = render(
    <TextareaCodeEditor
      language="js"
      data-testid="textarea"
      autoFocus
      value={`console.log('This is a bad example')\nconsole.log('This is a good example')`}
      onKeyDown={(evn) => {
        expect(evn.code.toLowerCase()).toEqual('tab');
        expect((evn.target as any).value).toEqual(
          `  console.log('This is a bad example')\n  console.log('This is a good example')`,
        );
      }}
    />,
  );

  if (firstChild && firstChild.firstChild) {
    (firstChild.firstChild as any).setSelectionRange(4, 60);
    fireEvent.keyDown(firstChild.firstChild, {
      key: 'Tab',
      code: 'Tab',
      charCode: 9,
    });
  }
});

it('TextareaCodeEditor onKeyDown Tab Multi-Line Input', async () => {
  const example = `\nfunction stopPropagation(e) {\n  e.stopPropagation();\n  e.preventDefault();\n}`;
  const expected = `\nfunction stopPropagation(e) {\ne.stopPropagation();\ne.preventDefault();\n}`;
  const {
    container: { firstChild },
  } = render(
    <TextareaCodeEditor
      language="js"
      data-testid="textarea"
      autoFocus
      value={example}
      onKeyDown={(evn) => {
        expect(evn.code.toLowerCase()).toEqual('tab');
        expect((evn.target as any).value).toEqual(expected);
      }}
    />,
  );

  if (firstChild && firstChild.firstChild) {
    (firstChild.firstChild as any).setSelectionRange(38, 67);
    fireEvent.keyDown(firstChild.firstChild, {
      key: 'Tab',
      code: 'Tab',
      charCode: 9,
      shiftKey: true,
    });
  }
});

it('TextareaCodeEditor onKeyDown Tab Multi-Line 2 Input', async () => {
  const example = `\nfunction stopPropagation(e) {\n  e.stopPropagation();\n  e.preventDefault();\n}`;
  const expected = `\nfunction stopPropagation(e) {\ne.stopPropagation();\ne.preventDefault();\n}`;
  const {
    container: { firstChild },
  } = render(
    <TextareaCodeEditor
      language="js"
      data-testid="textarea"
      autoFocus
      value={example}
      onKeyDown={(evn) => {
        expect(evn.code.toLowerCase()).toEqual('tab');
        expect((evn.target as any).value).toEqual(expected);
      }}
    />,
  );

  if (firstChild && firstChild.firstChild) {
    (firstChild.firstChild as any).setSelectionRange(6, 67);
    fireEvent.keyDown(firstChild.firstChild, {
      key: 'Tab',
      code: 'Tab',
      charCode: 9,
      shiftKey: true,
    });
  }
});
