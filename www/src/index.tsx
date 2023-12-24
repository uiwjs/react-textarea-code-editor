import { createRoot } from 'react-dom/client';
import data from '@uiw/react-textarea-code-editor/README.md';
import MarkdownPreviewExample from '@uiw/react-markdown-preview-example';
import App from './App';

const Github = MarkdownPreviewExample.Github;
const Example = MarkdownPreviewExample.Example;
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <MarkdownPreviewExample
    source={data.source}
    components={data.components}
    data={data.data}
    title="React Textarea Code Editor"
    description="A simple code editor with syntax highlighting."
    version={`v${VERSION}`}
  >
    <MarkdownPreviewExample.NavMenu
      title="Textarea Code Editor"
      menus={[
        <a target="_blank" href="https://jaywcjlove.github.io/#/sponsor" rel="noopener noreferrer">
          Sponsor
        </a>,
      ]}
    />
    <Github href="https://github.com/uiwjs/react-textarea-code-editor" />
    <Example>
      <App />
    </Example>
  </MarkdownPreviewExample>,
);
