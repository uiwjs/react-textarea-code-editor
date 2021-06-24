React Textarea Code Editor
===
<!--rehype:style=display:none;-->

[![Build & Deploy](https://github.com/uiwjs/react-textarea-code-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-textarea-code-editor/actions/workflows/ci.yml) [![Coverage Status](https://coveralls.io/repos/github/uiwjs/react-textarea-code-editor/badge.svg?branch=main)](https://coveralls.io/github/uiwjs/react-textarea-code-editor?branch=main) [![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/react-textarea-code-editor/file/README.md) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@uiw/react-textarea-code-editor)](https://www.npmjs.com/package/@uiw/react-textarea-code-editor) [![npm version](https://img.shields.io/npm/v/@uiw/react-textarea-code-editor.svg)](https://www.npmjs.com/package/@uiw/react-textarea-code-editor)

A simple code editor with syntax highlighting.

## Install

```bash
$ npm i @uiw/react-textarea-code-editor
```

## Usage

```jsx
import CodeEditor from '@uiw/react-textarea-code-editor';

function App() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <CodeEditor
      value={code}
      onChange={(env) => setCode(evn.target.value)}
      padding={24}
      style={{
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        fontSize: 12,
      }}
    />
  );
}
```

## Props

```ts
interface TextareaCodeEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  prefixCls?: string;
  /**
   * Set what programming language the code belongs to.
   */
  language?: string;
  /**
   * Optional padding for code. Default: `10`.
   */
  padding?: number;
}
```

## Demo

https://uiwjs.github.io/react-textarea-code-editor/

## Development

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
npm run watch
# Step 2, development mode, listen to compile preview website instance
npm run start
```

**`production`**

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Related

- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror): CodeMirror component for React.
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor): A simple markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-monacoeditor](https://github.com/jaywcjlove/react-monacoeditor): Monaco Editor component for React.
- [@uiw/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor): A markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-markdown-preview](https://github.com/jaywcjlove/react-monacoeditor): React component preview markdown text in web browser. 

## License

Licensed under the MIT License.