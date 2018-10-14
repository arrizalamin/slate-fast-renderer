// @flow
import React from 'react';
import renderLeaf from './renderLeaf';
import type {Plugin} from './plugin';
import type {Node, Data} from './value';

const renderNode = (
  node: Node,
  index: number,
  plugins: Array<Plugin>
): ?React$Node => {
  if (node.object === 'text') {
    return (
      <React.Fragment>
        {node.leaves.map((node, index) => renderLeaf(node, index, plugins))}
      </React.Fragment>
    );
  }

  const childrenNodes =
    node.nodes &&
    node.nodes.map((node, index) => renderNode(node, index, plugins));

  const children = <React.Fragment>{childrenNodes}</React.Fragment>;

  const data: ?Data =
    node.data &&
    (node.data instanceof Map ? node.data : new Map(Object.entries(node.data)));
  const newNode = data ? Object.assign(node, {data}) : node;

  const props = {
    node: newNode,
    attributes: {index},
    children,
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

    return plugin.renderNode(props, next);
  };

  return next();
};

export default renderNode;
