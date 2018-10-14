// @flow
import type {Node, Mark} from './value';

type RenderNodeProps = {
  node: Node,
  attributes: {[string]: any},
  children: React$Node,
};
type RenderMarkProps = {
  mark: Mark,
  attributes: {[string]: any},
  children: React$Node,
};

type NextFn = () => ?React$Node;

export type RenderNodeFn = (RenderNodeProps, NextFn) => ?React$Node;
export type RenderMarkFn = (RenderMarkProps, NextFn) => ?React$Node;

export type Plugin = {
  renderNode?: RenderNodeFn,
  renderMark?: RenderMarkFn,
};
