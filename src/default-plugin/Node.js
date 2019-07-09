// @flow
import * as React from 'react';
import type {Plugin} from '../plugin';
import type {Node as NodeType, Document, Block} from '../types';
import Text from './Text';
import Editor from '../editor';

type Props = {
  editor: Editor,
  node: NodeType,
  parent: Document | NodeType,
  block: Block,
  plugins: Array<Plugin>,
};

export default class Node extends React.PureComponent<Props> {
  render() {
    const {editor, node, parent, block, plugins} = this.props;

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
      node.nodes.map((childNode, i) => {
        const childBlock = childNode.object === 'block' ? childNode : block;
        return (
          <Node
            key={i.toString()}
            editor={editor}
            node={childNode}
            parent={node}
            block={childBlock}
            plugins={plugins}
          />
        );
      });
    const children = <React.Fragment>{childrenNodes}</React.Fragment>;

    const {key} = node;
    const renderNodeProps = {
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

    return editor.run(plugins, 'renderNode', renderNodeProps) || null;
  }
}
