React Textarea Code Editor
===
<!--rehype:style=display:none;-->

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Build & Deploy](https://github.com/uiwjs/react-textarea-code-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-textarea-code-editor/actions/workflows/ci.yml)
[![Coverage Status](https://uiwjs.github.io/react-textarea-code-editor/badges.svg)](https://uiwjs.github.io/react-textarea-code-editor/coverage/lcov-report)
[![NPM Download](https://img.shields.io/npm/dm/@uiw/react-textarea-code-editor.svg?style=flat)](https://www.npmjs.com/package/@uiw/react-textarea-code-editor)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/@uiw/react-textarea-code-editor/badge)](https://www.jsdelivr.com/package/npm/@uiw/react-textarea-code-editor)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/react-textarea-code-editor/file/README.md)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@uiw/react-textarea-code-editor)](https://bundlephobia.com/package/@uiw/react-textarea-code-editor)
[![npm version](https://img.shields.io/npm/v/@uiw/react-textarea-code-editor.svg)](https://www.npmjs.com/package/@uiw/react-textarea-code-editor)

A simple code editor with syntax highlighting. This library aims to provide a simple code editor with syntax highlighting support without any of the extra features, perfect for simple embeds and forms where users can submit code.

**`Features:`**

- 🌒 Support dark-mode/night-mode `@v2`. 
- ☕️ Automatic syntax highlighting.
- 🐲 Automatic indent on new lines.
- 🩲 Indent line or selected text by pressing tab key, with customizable indentation.
- 🌸 Wrap selected text in parens, <kbd>[]</kbd>, <kbd>()</kbd>, <kbd><></kbd>, <kbd>{}</kbd>, <kbd>""</kbd>, <kbd>''</kbd>, <kbd>""</kbd>, <kbd>``</kbd>
- 💡 Support [next.js](https://github.com/uiwjs/react-md-editor/issues/52#issuecomment-848969341), [Use examples](#support-nextjs) in [next.js](https://nextjs.org/).

## Install

```bash
$ npm i @uiw/react-textarea-code-editor
```

## Demo & Document

https://uiwjs.github.io/react-textarea-code-editor/


## Usage

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/summer-bush-o3qirc?fontsize=14&hidenavigation=1&theme=dark)
[![Open in Github gh-pages](https://img.shields.io/badge/Open%20In-Github%20gh--pages-blue?logo=github)](https://uiwjs.github.io/react-textarea-code-editor/)

```jsx
import React, { useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

export default function App() {
  const [code, setCode] = useState(
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
        backgroundColor: "#f5f5f5",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
}
```

## Highlight line or character

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/https-github-com-uiwjs-react-textarea-code-editor-issues-151-nsm7qp?fontsize=14&hidenavigation=1&theme=dark)

List of [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins) to use. 

```jsx
import CodeEditor from '@uiw/react-textarea-code-editor';
import rehypePrism from "rehype-prism-plus";
import rehypeRewrite from "rehype-rewrite";
import "./styles.css";

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
      rehypePlugins={[
        [rehypePrism, { ignoreMissing: true }],
        [
          rehypeRewrite,
          {
            rewrite: (node, index, parent) => {
              if (node.properties?.className?.includes("code-line")) {
                if (index === 0 && node.properties?.className) {
                  node.properties.className.push("demo01");
                  // console.log("~~~", index, node.properties?.className);
                }
              }
              if (node.type === "text" && node.value === "return" && parent.children.length === 1) {
                parent.properties.className.push("demo123");
              }
            }
          }
        ]
      ]}
      style={{
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
}
```

## Remove Code Highlight

The following example can help you exclude code highlighting code from being included in the bundle. `@uiw/react-textarea-code-editor/nohighlight` component does not contain the ~~`rehype-prism-plus`~~ code highlighting package.

```jsx
import React, { useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor/nohighlight';

export default function App() {
  const [code, setCode] = useState(
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
        backgroundColor: "#f5f5f5",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
}
```

## Show LineNumbers

```jsx
import rehypePrism from 'rehype-prism-plus';
import React, { useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

export default function App() {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <CodeEditor
      value={code}
      language="js"
      placeholder="Please enter JS code."
      onChange={(evn) => setCode(evn.target.value)}
      rehypePlugins={[
        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }]
      ]}
      style={{
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
npm install @uiw/react-textarea-code-editor@v1.4.4
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
import "@uiw/react-textarea-code-editor/dist.css";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
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

## Support dark-mode/night-mode

By default, the [`dark-mode`](https://github.com/jaywcjlove/dark-mode/) is automatically switched according to the system. If you need to switch manually, just set the `data-color-mode="dark"` parameter for html Element. 

```html
<html data-color-mode="dark">
```

```js
document.documentElement.setAttribute('data-color-mode', 'dark')
document.documentElement.setAttribute('data-color-mode', 'light')
```

Inherit custom color variables by adding `.w-tc-editor-var` selector.

```jsx
const Demo = () => {
  return (
    <div>
      <div className="w-tc-editor-var"> </div>
      <CodeEditor value={code} />
    </div>
  )
}
```

Set (`data-color-mode="dark"`) dark theme.

```jsx
import CodeEditor from '@uiw/react-textarea-code-editor';

function App() {
  return (
    <CodeEditor
      value="function add(a, b) {\n  return a + b;\n}"
      data-color-mode="dark"
    />
  );
}
```

## Props

```ts
interface TextareaCodeEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  prefixCls?: string;
  /**
   * Support dark-mode/night-mode
   */
  ['data-color-mode']?: 'dark' | 'light';
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
  /**
   * The number of spaces for indentation when pressing tab key. Default: `2`.
   */
  indentWidth?: number
}
```

List of supported languages can be found [here](https://github.com/wooorm/refractor#syntaxes)

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

## See Also

- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror): CodeMirror component for React.
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor): A simple markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-monacoeditor](https://github.com/jaywcjlove/react-monacoeditor): Monaco Editor component for React.
- [@uiw/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor): A markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-markdown-preview](https://github.com/uiwjs/react-markdown-preview): React component preview markdown text in web browser. 

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-textarea-code-editor/graphs/contributors">
  <img src="https://uiwjs.github.io/react-textarea-code-editor/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
