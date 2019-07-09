// @flow
import * as React from 'react';
import type {
  RenderNodeFn,
  RenderMarkFn,
  RenderEditorFn,
  Plugin,
} from './plugin';
import type {Value} from './types';
import defaultPlugin from './default-plugin';
import Editor from './editor';
export {default as Value} from './value';

let n = 0;
export const generateKey = () => `${n++}`;

type Props = {
  value: Value,
  renderNode?: RenderNodeFn,
  renderMark?: RenderMarkFn,
  renderEditor?: RenderEditorFn,
  plugins?: Array<Plugin>,
};

export const renderToArray = (props: Props): Array<React.Node> => {
  const {renderNode, renderMark, renderEditor} = props;
  const propsPlugin = {
    renderNode,
    renderMark,
    renderEditor,
  };
  const plugins: Array<Plugin> = [
    propsPlugin,
    ...(props.plugins || []),
    defaultPlugin,
  ];
  const editor = new Editor(props.value);
  const renderToArrayProps = {
    plugins,
    value: props.value,
  };

  return editor.run(plugins, 'renderToArray', renderToArrayProps) || [];
};
