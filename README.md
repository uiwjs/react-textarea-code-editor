React Textarea Code Editor
===
<!--rehype:style=display:none;-->

[![Build & Deploy](https://github.com/uiwjs/react-textarea-code-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-textarea-code-editor/actions/workflows/ci.yml) [![Coverage Status](https://uiwjs.github.io/react-textarea-code-editor/coverage/badges.svg)](https://uiwjs.github.io/react-textarea-code-editor/coverage/lcov-report) [![Coverage Status](https://img.shields.io/npm/dm/react-textarea-code-editor-2.svg?style=flat)](https://www.npmjs.com/package/react-textarea-code-editor-2) [![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/react-textarea-code-editor-2/file/README.md) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-textarea-code-editor-2)](https://bundlephobia.com/package/react-textarea-code-editor-2) [![npm version](https://img.shields.io/npm/v/react-textarea-code-editor-2.svg)](https://www.npmjs.com/package/react-textarea-code-editor-2)

A simple code editor with syntax highlighting. This library aims to provide a simple code editor with syntax highlighting support without any of the extra features, perfect for simple embeds and forms where users can submit code.

**`Features:`**

- ☕️ Automatic syntax highlighting.
- 🐲 Automatic indent on new lines.
- 🩲 Indent line or selected text by pressing tab key, with customizable indentation.
- 🌸 Wrap selected text in parens, <kbd>[]</kbd>, <kbd>()</kbd>, <kbd><></kbd>, <kbd>{}</kbd>, <kbd>""</kbd>, <kbd>''</kbd>, <kbd>""</kbd>, <kbd>``</kbd>
- 💡 Support [next.js](https://github.com/uiwjs/react-md-editor/issues/52#issuecomment-848969341), [Use examples](#support-nextjs) in [next.js](https://nextjs.org/).

## Install

```bash
$ npm i react-textarea-code-editor-2
```

## Usage

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/react-textarea-code-editor-for-example-mcebp?fontsize=14&hidenavigation=1&theme=dark)
[![Open in Github gh-pages](https://img.shields.io/badge/Open%20In-Github%20gh--pages-blue?logo=github)](https://uiwjs.github.io/react-textarea-code-editor/)

```jsx
import CodeEditor from 'react-textarea-code-editor-2';

function App() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <CodeEditor
      value={code}
      language="js"
      placeholder="Please enter JS code."
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
}
```

## Support Nextjs

Use examples in nextjs. [#31](https://github.com/uiwjs/react-textarea-code-editor/issues/31#issuecomment-909363339)

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/react-textarea-code-editor-example-nextjs-gdzlw?fontsize=14&hidenavigation=1&theme=dark)

```bash
npm install next-remove-imports
npm install react-textarea-code-editor-2@v1.4.4
```

```js
// next.config.js
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  experimental: { esmExternals: true }
});
```

```jsx
import React from "react";
import dynamic from "next/dynamic";
import "react-textarea-code-editor-2/dist.css";

const CodeEditor = dynamic(
  () => import("react-textarea-code-editor-2").then((mod) => mod.default),
  { ssr: false }
);

function HomePage() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <div>
      <CodeEditor
        value={code}
        language="js"
        placeholder="Please enter JS code."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
        }}
      />
    </div>
  );
}

export default HomePage;
```

## Props

See [`refractor.register(syntax)`](https://github.com/wooorm/refractor#refractorregistersyntax) to understand
what to pass to `syntax` prop.

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
  /**
   * The minimum height of the editor. Default: `16`.
   */
  minHeight?: number;
  /**
   * A refractor syntax (Prism language definition) to be registered by refractor. Default: `undefined`.
   */
  syntax?: refractor.RefractorSyntax;
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
- [@uiw/react-markdown-preview](https://github.com/uiwjs/react-markdown-preview): React component preview markdown text in web browser. 

## License

Licensed under the MIT License.
