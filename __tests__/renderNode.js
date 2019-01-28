// @flow
import React from 'react';
import type {RenderNodeProps, NextFn} from '../src/plugin';
import Editor from '../src/editor';

export default (props: RenderNodeProps, editor: Editor, next: NextFn) => {
  const {attributes, node, children} = props;
  if (node.object === 'text') {
    return next();
  }
  switch (node.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;

    default:
      return next();
  }
};
