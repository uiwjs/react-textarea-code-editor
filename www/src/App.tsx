import React, { useEffect, useState } from 'react';
import Loader from '@uiw/react-loader';
import exts from 'code-example/ext.json';
import '@wcj/dark-mode';
import TextareaCodeEditor from '@uiw/react-textarea-code-editor';
import { styled } from 'styled-components';

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

const Wrapper = styled.div``;
const Editor = styled.div`
  max-width: 593px;
  height: 260px;
  overflow: auto;
`;
const Tools = styled.div`
  margin-top: 5px;
  margin-bottom: 50px !important;
`;
const TestCase = styled.div`
  max-width: 593px;
  margin: 0 auto;
`;

const App: React.FC = () => {
  const [language, setLanguage] = useState('jsx');
  const { lang, loading, code, setCode } = useFetch(language);
  return (
    <Wrapper className="wmde-markdown-var">
      <Editor>
        <TextareaCodeEditor
          autoFocus
          value={code}
          language={lang}
          minHeight={80}
          placeholder={`Please enter ${(language || '').toLocaleUpperCase()} code.`}
          style={{
            fontSize: 14,
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
          onChange={(evn) => setCode(evn.target.value)}
        />
      </Editor>
      <Tools>
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
      </Tools>
      <TestCase>
        <span>Test case</span>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 12 }}>
          <TextareaCodeEditor placeholder={`Please enter ${(language || '').toLocaleUpperCase()} code.`} />
          <button type="button" style={{ marginLeft: 12 }}>
            Edit
          </button>
        </div>
      </TestCase>
    </Wrapper>
  );
};

export default App;
