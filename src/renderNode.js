// @flow
import * as React from 'react';
import type {Plugin} from './plugin';
import type {Node, Document, Block} from './types';
import Text from './text';
import Editor from './editor';

const renderNode = (
  editor: Editor,
  node: Node,
  parent: Document | Node,
  block: Block,
  plugins: Array<Plugin>
): React.Node => {
  if (node.object === 'text') {
    return (
      <Text
        editor={editor}
        node={node}
        plugins={plugins}
        // $FlowFixMe
        parent={parent}
      />
    );
  }

  const childrenNodes =
    node.nodes &&
    node.nodes.map(childNode => {
      const childBlock = childNode.object === 'block' ? childNode : block;
      return renderNode(editor, childNode, node, childBlock, plugins);
    });
  const children = <React.Fragment>{childrenNodes}</React.Fragment>;

  const {key} = node;
  const props = {
    node,
    attributes: {'data-key': key, key},
    children,
    block,
    parent,
    editor,
    readOnly: true,
    isFocused: false,
    isSelected: false,
    decorations: [],
  };

  return editor.run(plugins, 'renderNode', props) || null;
};

export default renderNode;
