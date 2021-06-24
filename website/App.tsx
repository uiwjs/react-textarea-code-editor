import React, { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import GitHubCorners from '@uiw/react-github-corners';
import rehypeAttr from 'rehype-attr';
// @ts-ignore
import exts from 'code-example/ext.json';
import TextareaCodeEditor from '../';
import MDStr from '../README.md';
import './App.css';

const codeStr = `import React from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import ReactDOM from "react-dom";

function App() {
  return (
    <CodeEditor
      value="console.log('Hello World')"
      language="js"
    />
  );
}

ReactDOM.render(<App />, document.getElementById("root"));`;

const App: React.FC = () => {
  const [value, setValue] = useState(codeStr);
  const [language, setLanguage] = useState('jsx');
  useEffect(() => {
    if (language) {
      import(`code-example/txt/sample.${language}.txt`)
        .then((code) => {
          setValue(code.default || '');
        })
        .catch((err) => {
          setValue('');
        });
    }
  }, [language]);
  return (
    <div className="App">
      <GitHubCorners fixed href="https://github.com/kktjs/kkt" />
      <h1 className="App-title">React Textarea Code Editor</h1>
      <div className="App-editor">
        <TextareaCodeEditor
          language={language}
          value={value}
          style={{ backgroundColor: '#fafafa', outline: 0 }}
          autoFocus
          onChange={(evn) => setValue(evn.target.value)}
        />
      </div>
      <div className="App-tools" style={{ marginTop: 5 }}>
        <select value={language} onChange={(evn) => setLanguage(evn.target.value)}>
          {exts.map((keyName, idx) => {
            if (/^diff/.test(keyName)) return null;
            return (
              <option key={idx} value={keyName}>
                Language: {keyName}
              </option>
            );
          })}
        </select>
      </div>
      <MarkdownPreview source={MDStr} className="info" rehypePlugins={[[rehypeAttr, { properties: 'attr' }]]} />
    </div>
  );
};

export default App;
