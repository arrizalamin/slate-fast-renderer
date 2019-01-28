// @flow
import React from 'react';
import type {RenderNodeProps, NextFn} from '../src/plugin';
import Editor from '../src/editor';

const renderEditor = (props: RenderNodeProps, editor: Editor, next: NextFn) => {
  const children = next();

  return <div>{children}</div>;
};

export default renderEditor;
