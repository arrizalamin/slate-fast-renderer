// @flow
export type Data = Map<string, any>;
export type DataJSON = {[string]: any};

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

type Text = {
  key?: string,
  leaves: Array<Leaf>,
  object: 'text',
};

export type Node = Block | Inline | Text;
/* eslint-enable no-use-before-define */

type DocumentJSON = {
  nodes?: Array<Node>,
  key?: string,
  data?: Data | DataJSON,
  object?: 'document',
};

export type Value = {
  object?: 'value',
  document?: DocumentJSON,
  data?: {[string]: any},
};
