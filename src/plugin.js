// @flow
import type {Node, Mark} from './value';

export type RenderNodeProps = {
  node: Node,
  attributes: {[string]: any},
  children: React$Node,
};
export type RenderMarkProps = {
  mark: Mark,
  attributes: {[string]: any},
  children: React$Node,
};

export type NextFn = () => ?React$Node;

export type RenderNodeFn = (RenderNodeProps, NextFn) => ?React$Node;
export type RenderMarkFn = (RenderMarkProps, NextFn) => ?React$Node;

export type Plugin = {
  renderNode?: RenderNodeFn,
  renderMark?: RenderMarkFn,
};
