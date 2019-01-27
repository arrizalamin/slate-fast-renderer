// @flow
import React from 'react';
import type {
  RenderNodeFn,
  RenderMarkFn,
  RenderEditorFn,
  Plugin,
} from './plugin';
import type {Value} from './value';
import renderNode from './renderNode';
import defaultRenderEditor from './renderEditor';
import run from './run';

type Props = {
  value: Value,
  renderNode?: RenderNodeFn,
  renderMark?: RenderMarkFn,
  renderEditor?: RenderEditorFn,
  plugins?: Array<Plugin>,
};

export default class SlateRenderer extends React.PureComponent<Props> {
  plugins: Array<Plugin>;

  constructor(props: Props) {
    super(props);
    const {plugins = [], renderNode, renderMark, renderEditor} = props;
    const propsPlugin = {
      renderNode,
      renderMark,
      renderEditor,
    };
    const defaultPlugin = {
      renderEditor: defaultRenderEditor,
    };
    this.plugins = [propsPlugin, ...plugins, defaultPlugin];
  }

  render() {
    const props = {
      autoCorrect: false,
      autoFocus: false,
      className: '',
      editor: {},
      defaultValue: {},
      id: '',
      onChange: () => {},
      options: Object,
      plugins: this.plugins,
      readOnly: true,
      role: '',
      schema: Object,
      spellCheck: false,
      style: Object,
      tabIndex: 0,
      value: this.props.value,
    };

    return run(this.plugins, 'renderEditor', props) || null;
  }
}
