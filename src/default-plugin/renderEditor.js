// @flow
import * as React from 'react';
import type {RenderEditorProps} from '../plugin';
import renderNode from '../renderNode';
import Editor from '../editor';

const renderEditor = (props: RenderEditorProps, editor: Editor): React.Node => {
  const {value, plugins} = props;
  const {document} = value;

  if (document && document.nodes) {
    return (
      <React.Fragment>
        {document.nodes.map(node =>
          renderNode(editor, node, document, node, plugins)
        )}
      </React.Fragment>
    );
  }
  return null;
};

export default renderEditor;
