React Textarea Code Editor
===
<!--rehype:style=display:none;-->

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
        fontFamily: '"Fira code", "Fira Mono", monospace',
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