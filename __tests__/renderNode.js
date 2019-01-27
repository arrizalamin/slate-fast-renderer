// @flow
import React from 'react';
import type {RenderNodeProps, Editor, NextFn} from '../src/plugin';

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
