// @flow
import * as React from 'react';
import type {Node, Document, Mark} from './value';

export type RenderNodeProps = {
  attributes: {[string]: any},
  children: React.Node,
  node: Node,
  parent: Document | Node,
  editor: Object,
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
  editor: Object,
  marks: Array<Mark>,
  node: ?Node,
  offset: number,
  text: string,
};

export type NextFn = () => ?React.Node;

export type RenderNodeFn = (RenderNodeProps, Object, NextFn) => ?React.Node;
export type RenderMarkFn = (RenderMarkProps, Object, NextFn) => ?React.Node;

export type Plugin = {
  renderNode?: RenderNodeFn,
  renderMark?: RenderMarkFn,
};
