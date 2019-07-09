// @flow
import * as React from 'react';
import type {RenderToArrayProps} from '../plugin';
import Node from './Node';
import Editor from '../editor';

const renderEditor = (
  props: RenderToArrayProps,
  editor: Editor
): Array<React.Node> => {
  const {value, plugins} = props;
  const {document} = value;

  return document && document.nodes
    ? document.nodes.map((node, i) => (
        <Node
          key={i.toString()}
          editor={editor}
          node={node}
          parent={document}
          block={node}
          plugins={plugins}
        />
      ))
    : [];
};

export default renderEditor;
