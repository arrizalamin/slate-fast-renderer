// @flow
import React from 'react';
import type {Leaf, Mark} from './value';
import type {Plugin} from './plugin';

const renderLeaf = (
  leaf: Leaf,
  index: number,
  plugins: Array<Plugin>
): ?React$Node => {
  const textNode = <span key={index}>{leaf.text}</span>;
  if (!leaf.marks) {
    return textNode;
  }
  return leaf.marks.reduce(
    (children: ?React$Node, mark: Mark, index: number): ?React$Node => {
      const props = {
        mark,
        attributes: {key: index},
        children,
      };

      let i = 0;
      const next = () => {
        const plugin = plugins[i];
        i = i + 1;
        if (!plugin) {
          return null;
        }
        if (!plugin.renderMark) {
          return next();
        }

        return plugin.renderMark(props, next);
      };

      return next();
    },
    textNode
  );
};

export default renderLeaf;
