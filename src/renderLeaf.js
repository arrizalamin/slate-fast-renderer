// @flow
import * as React from 'react';
import type {Text, Leaf, Mark} from './value';
import type {Plugin} from './plugin';
import {generateKey} from './key-generator';

const renderLeaf = (
  leaf: Leaf,
  index: number,
  node: Text,
  offset: number,
  plugins: Array<Plugin>
): ?React.Node => {
  const textNode = <React.Fragment key={index}>{leaf.text}</React.Fragment>;
  const {marks} = leaf;
  if (!marks) {
    return textNode;
  }
  return marks.reduce((children: React.Node, mark: Mark): React.Node => {
    const key = generateKey();
    const props = {
      mark,
      attributes: {'data-key': key, key},
      children,
      editor: {},
      marks,
      node,
      offset,
      text: leaf.text || '',
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

      return plugin.renderMark(props, {}, next);
    };

    return next() || null;
  }, textNode);
};

export default renderLeaf;
