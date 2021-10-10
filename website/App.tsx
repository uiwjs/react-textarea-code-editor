import React, { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import GitHubCorners from '@uiw/react-github-corners';
import Loader from '@uiw/react-loader';
import exts from 'code-example/ext.json';
import TextareaCodeEditor from '../';
import MDStr from '../README.md';
import './App.css';

const useFetch = (language: string) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState(language);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const codeStr = await import(`code-example/txt/sample.${language}.txt`);
        setCode(codeStr.default);

        let str = language;
        if (/^(mysql|pgsql)$/.test(language)) {
          str = 'sql';
        }
        if (/^(objective-c)$/.test(language)) {
          str = 'objc';
        }
        if (/^(vue)$/.test(language)) {
          str = 'html';
        }
        setLang(str);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
        setCode('');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return { lang, loading, code, setCode, error };
};

const App: React.FC = () => {
  const [language, setLanguage] = useState('jsx');
  const { lang, loading, code, setCode } = useFetch(language);
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
          value={code}
          language={lang}
          minHeight={80}
          placeholder={`Please enter ${(language || '').toLocaleUpperCase()} code.`}
          style={{
            backgroundColor: '#f5f5f5',
            fontSize: 14,
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
          onChange={(evn) => setCode(evn.target.value)}
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
        <Loader loading={loading} />
      </div>
      <MarkdownPreview source={MDStr} className="info" />
    </div>
  );
};

export default App;
