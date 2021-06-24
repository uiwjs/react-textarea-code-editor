import React, { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import GitHubCorners from '@uiw/react-github-corners';
import rehypeAttr from 'rehype-attr';
// @ts-ignore
import exts from 'code-example/ext.json';
import TextareaCodeEditor from '../';
import MDStr from '../README.md';
import './App.css';

const App: React.FC = () => {
  const [value, setValue] = useState('');
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
  // @ts-ignore
  const version = VERSION;
  return (
    <div className="App">
      <GitHubCorners fixed href="https://github.com/uiwjs/react-textarea-code-editor" />
      <h1 className="App-title">
        React Textarea Code Editor
        <sup>{version}</sup>
      </h1>
      <div className="App-editor">
        <TextareaCodeEditor
          autoFocus
          value={value}
          language={language}
          style={{ backgroundColor: '#f5f5f5', outline: 0, fontSize: 14 }}
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
