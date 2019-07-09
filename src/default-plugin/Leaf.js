// @flow
import * as React from 'react';
import type {Text, Leaf as LeafType, Mark} from '../types';
import type {Plugin} from '../plugin';
import {generateKey} from '../utils';
import Editor from '../editor';

type Props = {
  editor: Editor,
  leaf: LeafType,
  index: number,
  node: Text,
  offset: number,
  plugins: Array<Plugin>,
};

export default class Leaf extends React.PureComponent<Props> {
  render() {
    const {editor, leaf, index, node, offset, plugins} = this.props;
    const {marks} = leaf;
    const textNode = <React.Fragment key={index}>{leaf.text}</React.Fragment>;

    return marks
      ? marks.reduce((children: React.Node, mark: Mark): React.Node => {
          const key = generateKey();
          const renderLeafProps = {
            mark,
            attributes: {'data-key': key, key},
            children,
            editor,
            marks,
            node,
            offset,
            text: leaf.text || '',
          };

          return editor.run(plugins, 'renderMark', renderLeafProps) || null;
        }, textNode)
      : textNode;
  }
}
