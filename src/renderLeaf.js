// @flow
import * as React from 'react';
import type {Text, Leaf, Mark} from './value';
import type {Plugin} from './plugin';
import {generateKey} from './key-generator';
import run from './run';

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

    return run(plugins, 'renderMark', props) || null;
  }, textNode);
};

export default renderLeaf;
