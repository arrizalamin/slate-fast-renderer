// @flow
import * as React from 'react';
import type {Text} from './value';
import type {Plugin} from './plugin';
import renderLeaf from './renderLeaf';

type Props = {
  node: Text,
  parent: Node,
  plugins: Array<Plugin>,
};

export default class TextNode extends React.PureComponent<Props> {
  render() {
    const {node, plugins} = this.props;
    let offset = 0;
    return (
      <React.Fragment>
        {node.leaves.map((leaf, index) => {
          offset += (leaf.text || '').length;
          return renderLeaf(leaf, index, node, offset, plugins);
        })}
      </React.Fragment>
    );
  }
}
