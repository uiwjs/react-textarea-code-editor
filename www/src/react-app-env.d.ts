/// <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare var VERSION: string;

declare module '*.md' {
  import { CodeBlockData } from 'markdown-react-code-preview-loader';
  const src: CodeBlockData;
  export default src;
}
