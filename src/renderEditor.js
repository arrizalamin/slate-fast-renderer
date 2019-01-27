// @flow
import * as React from 'react';
import type {Plugin, RenderEditorProps, Editor, NextFn} from './plugin';
import type {Value, Node, Document, Block} from './value';
import renderNode from './renderNode';

const renderEditor = (
  props: RenderEditorProps,
  editor: Editor,
  next: NextFn
): React.Node => {
  const {value, plugins} = props;
  const {document} = value;

  if (document && document.nodes) {
    return (
      <React.Fragment>
        {document.nodes.map(node => renderNode(node, document, node, plugins))}
      </React.Fragment>
    );
  }
  return null;
};

export default renderEditor;
