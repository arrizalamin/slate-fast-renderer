// @flow
import * as React from 'react';
import type {
  RenderNodeFn,
  RenderMarkFn,
  RenderEditorFn,
  RenderTextFn,
  Plugin,
} from './plugin';
import type {Value} from './types';
import defaultPlugin from './default-plugin';
import Editor from './editor';

export {default as Value} from './value';
export * as RenderUtils from './utils';

type Props = {
  value: Value,
  renderNode?: RenderNodeFn,
  renderMark?: RenderMarkFn,
  renderEditor?: RenderEditorFn,
  renderText?: RenderTextFn,
  plugins?: Array<Plugin>,
};

export default class SlateRenderer extends React.PureComponent<Props> {
  plugins: Array<Plugin>;

  constructor(props: Props) {
    super(props);
    const {
      plugins = [],
      renderNode,
      renderMark,
      renderEditor,
      renderText,
    } = props;
    const propsPlugin = {
      renderNode,
      renderMark,
      renderEditor,
      renderText,
    };
    this.plugins = [propsPlugin, ...plugins, defaultPlugin];
  }

  render() {
    const editor = new Editor(this.props.value);
    const props = {
      autoCorrect: false,
      autoFocus: false,
      className: '',
      editor,
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

    return editor.run(this.plugins, 'renderEditor', props) || null;
  }
}
