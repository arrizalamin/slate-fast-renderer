// @flow
import * as React from 'react';
import type {Plugin} from './plugin';
import type {Node, Document, Block, Data} from './value';
import {generateKey} from './key-generator';
import Text from './text';

const renderNode = (
  node: Node,
  parent: Document | Node,
  block: Block,
  plugins: Array<Plugin>
): React.Node => {
  if (node.object === 'text') {
    return (
      <Text
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
      return renderNode(childNode, node, childBlock, plugins);
    });

  const children = <React.Fragment>{childrenNodes}</React.Fragment>;

  const data: ?Data =
    node.data &&
    (node.data instanceof Map ? node.data : new Map(Object.entries(node.data)));
  const key = generateKey();

  const props = {
    node: data ? Object.assign(node, {data}) : node,
    attributes: {'data-key': key, key},
    children,
    block,
    parent,
    editor: {},
    readOnly: true,
    isFocused: false,
    isSelected: false,
    decorations: [],
  };

  let i = 0;
  const next = () => {
    const plugin = plugins[i];
    i = i + 1;
    if (!plugin) {
      return null;
    }
    if (!plugin.renderNode) {
      return next();
    }

    return plugin.renderNode(props, {}, next);
  };

  return next() || null;
};

export default renderNode;
