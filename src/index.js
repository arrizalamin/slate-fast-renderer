// @flow
import React from 'react';
import type {RenderNodeFn, RenderMarkFn, Plugin} from './plugin';
import type {Value} from './value';
import renderNode from './renderNode';

type Props = {
  value: Value,
  renderNode?: RenderNodeFn,
  renderMark?: RenderMarkFn,
  plugins?: Array<Plugin>,
};

export default class SlateRenderer extends React.PureComponent<Props> {
  plugins: Array<Plugin>;

  constructor(props: Props) {
    super(props);
    const {plugins = [], renderNode, renderMark} = props;
    const corePlugin = {renderNode, renderMark};
    this.plugins = [corePlugin, ...plugins];
  }

  render() {
    const {value} = this.props;

    if (value.document && value.document.nodes) {
      return (
        <React.Fragment>
          {value.document.nodes.map((node, index) =>
            renderNode(node, index, this.plugins)
          )}
        </React.Fragment>
      );
    }
    return null;
  }
}
