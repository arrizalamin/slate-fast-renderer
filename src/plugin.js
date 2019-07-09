// @flow
import * as React from 'react';
import type {Value, Node, Document, Mark} from './types';
import Editor from './editor';

export type RenderEditorProps = {
  autoCorrect: boolean,
  autoFocus: boolean,
  className: string,
  editor: Editor,
  id: string,
  onChange: Function,
  options: Object,
  plugins: Array<Plugin>, // eslint-disable-line no-use-before-define
  readOnly: boolean,
  role: string,
  schema: Object,
  spellCheck: boolean,
  style: Object,
  tabIndex: number,
  value: Value,
};
export type RenderNodeProps = {
  attributes: {[string]: any},
  children: React.Node,
  node: Node,
  parent: Document | Node,
  editor: Editor,
  readOnly: boolean,
  isFocused: boolean,
  isSelected: boolean,
  decorations: Array<Object>,
  block: Node,
};
export type RenderMarkProps = {
  mark: Mark,
  attributes: {[string]: any},
  children: React.Node,
  editor: Editor,
  marks: Array<Mark>,
  node: ?Node,
  offset: number,
  text: string,
};
export type RenderToArrayProps = {
  plugins: Array<Plugin>, // eslint-disable-line no-use-before-define
  value: Value,
};

export type NextFn = () => ?React.Node;

export type RenderEditorFn = (RenderEditorProps, Object, NextFn) => ?React.Node;
export type RenderNodeFn = (RenderNodeProps, Object, NextFn) => ?React.Node;
export type RenderMarkFn = (RenderMarkProps, Object, NextFn) => ?React.Node;
export type RenderToArrayFn = (
  RenderToArrayProps,
  Object,
  NextFn
) => Array<React.Node>;

export type Plugin = {
  renderEditor?: RenderEditorFn,
  renderNode?: RenderNodeFn,
  renderMark?: RenderMarkFn,
  renderToArray?: RenderToArrayFn,
};
