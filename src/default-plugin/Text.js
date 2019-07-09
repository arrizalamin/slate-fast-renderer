// @flow
import * as React from 'react';
import type {Text} from '../types';
import type {Plugin} from '../plugin';
import Leaf from './Leaf';
import Editor from '../editor';

type Props = {
  editor: Editor,
  node: Text,
  parent: Node,
  plugins: Array<Plugin>,
};

export default class TextNode extends React.PureComponent<Props> {
  render() {
    const {editor, node, plugins} = this.props;
    let offset = 0;
    return (
      <React.Fragment>
        {node.leaves.map(
          (leaf, index): ?React.Node => {
            offset += (leaf.text || '').length;
            return (
              <Leaf
                key={index.toString()}
                editor={editor}
                leaf={leaf}
                index={index}
                node={node}
                offset={offset}
                plugins={plugins}
              />
            );
          }
        )}
      </React.Fragment>
    );
  }
}
