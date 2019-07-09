// @flow
import * as React from 'react';
import type {RenderEditorProps} from '../plugin';
import Node from './Node';
import Editor from '../editor';

const renderEditor = (props: RenderEditorProps, editor: Editor): React.Node => {
  const {value, plugins} = props;
  const {document} = value;

  if (document && document.nodes) {
    return (
      <React.Fragment>
        {document.nodes.map((node, i) => (
          <Node
            key={i.toString()}
            editor={editor}
            node={node}
            parent={document}
            block={node}
            plugins={plugins}
          />
        ))}
      </React.Fragment>
    );
  }
  return null;
};

export default renderEditor;
