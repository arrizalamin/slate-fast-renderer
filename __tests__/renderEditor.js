// @flow
import React from 'react';
import type {RenderNodeProps, Editor, NextFn} from '../src/plugin';

const renderEditor = (props: RenderNodeProps, editor: Editor, next: NextFn) => {
  const children = next();

  return <div>{children}</div>;
};

export default renderEditor;
