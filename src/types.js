// @flow
export type Data = Map<string, mixed>;
export type DataJSON = {[string]: mixed};

type WithKey = {
  key: string,
};

type WithData = {
  data: Data,
};

export type MarkJSON = {
  type: string,
  data?: DataJSON,
};

export type Mark = WithKey & WithData & MarkJSON;

export type LeafJSON = {
  marks?: Array<Mark>,
  text?: string,
};

export type Leaf = {
  key: string,
  marks?: Array<Mark>,
  text?: string,
};

/* eslint-disable no-use-before-define */
export type InlineJSON = {
  type: string,
  nodes?: Array<NodeJSON>,
  data?: DataJSON,
  object: 'inline',
};

export type Inline = {
  key: string,
  type: string,
  nodes?: Array<Node>,
  data?: Data,
  object: 'inline',
};

export type BlockJSON = {
  type: string,
  nodes?: Array<NodeJSON>,
  data?: DataJSON,
  object: 'block',
};

export type Block = {
  key: string,
  type: string,
  nodes?: Array<Node>,
  data?: Data,
  object: 'block',
};

export type TextJSON = {
  leaves: Array<LeafJSON>,
  object: 'text',
};

export type Text = {
  key: string,
  leaves: Array<Leaf>,
  object: 'text',
};

export type NodeJSON = BlockJSON | InlineJSON | TextJSON;

export type Node = Block | Inline | Text;
/* eslint-enable no-use-before-define */

export type DocumentJSON = {
  nodes?: Array<BlockJSON>,
  data?: DataJSON,
  object?: 'document',
};

export type Document = {
  key: string,
  nodes?: Array<Block>,
  data?: Data,
  object?: 'document',
};

export type ValueJSON = {
  object?: 'value',
  document?: DocumentJSON,
  data?: {[string]: any},
};

export type Value = {
  key: string,
  object?: 'value',
  document?: Document,
  data?: Data,
};
