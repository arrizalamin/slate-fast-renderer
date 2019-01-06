// @flow
export type Data = Map<string, mixed>;
export type DataJSON = {[string]: mixed};

export type Mark = {
  type: string,
  data?: DataJSON,
};

export type Leaf = {
  marks?: Array<Mark>,
  text?: string,
};

/* eslint-disable no-use-before-define */
export type Inline = {
  type: string,
  key?: string,
  nodes?: Array<Node>,
  data?: Data | DataJSON,
  object: 'inline',
};

export type Block = {
  type: string,
  key?: string,
  nodes?: Array<Node>,
  data?: Data | DataJSON,
  object: 'block',
};

export type Text = {
  key?: string,
  leaves: Array<Leaf>,
  object: 'text',
};

export type Node = Block | Inline | Text;
/* eslint-enable no-use-before-define */

export type Document = {
  nodes?: Array<Block>,
  key?: string,
  data?: Data | DataJSON,
  object?: 'document',
};

export type Value = {
  object?: 'value',
  document?: Document,
  data?: {[string]: any},
};
