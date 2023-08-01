import React from 'react';

export const container: React.CSSProperties = {
  position: 'relative',
  textAlign: 'left',
  boxSizing: 'border-box',
  padding: 0,
  overflow: 'hidden',
};

export const textarea: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  resize: 'none',
  color: 'inherit',
  opacity: 0.8,
  overflow: 'hidden',
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
  WebkitTextFillColor: 'transparent',
};

export const editor: React.CSSProperties = {
  margin: 0,
  border: 0,
  background: 'none',
  boxSizing: 'inherit',
  display: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontVariantLigatures: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: 'inherit',
  lineHeight: 'inherit',
  tabSize: 'inherit',
  textIndent: 'inherit',
  textRendering: 'inherit',
  textTransform: 'inherit',
  whiteSpace: 'pre-wrap',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  outline: 0,
};
