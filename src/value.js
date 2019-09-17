// @flow
import type {
  ValueJSON,
  Value,
  Data,
  DataJSON,
  Document,
  DocumentJSON,
  BlockJSON,
  Block,
  TextJSON,
  Node,
  NodeJSON,
  LeafJSON,
  Leaf,
  MarkJSON,
  Mark,
} from './types';
import {generateKey} from './utils';

export const getTextFromTextNode = (text: TextJSON): string =>
  text.leaves.reduce(
    (text: string, leaf: LeafJSON) => text + (leaf.text || ''),
    ''
  );

export const getTextFromNode = (node: NodeJSON): string =>
  node.object === 'text'
    ? getTextFromTextNode(node)
    : Array.isArray(node.nodes)
      ? node.nodes.reduce(
          (text: string, node: NodeJSON) =>
            text +
            (node.object === 'text'
              ? getTextFromTextNode(node)
              : getTextFromNode(node)),
          ''
        )
      : '';

const getDataFromJSON = (dataJSON: ?DataJSON): Data =>
  dataJSON ? new Map(Object.entries(dataJSON)) : new Map();

const getBlockFromJSON = (blockJSON: BlockJSON): Block => ({
  object: 'block',
  type: blockJSON.type,
  key: generateKey(),
  data: getDataFromJSON(blockJSON.data),
  nodes: blockJSON.nodes && blockJSON.nodes.map(getNodeFromJSON), // eslint-disable-line no-use-before-define
  get text() {
    return getTextFromNode(blockJSON);
  },
});

const getMarkFromJSON = (markJSON: MarkJSON): Mark => ({
  key: generateKey(),
  type: markJSON.type,
  data: getDataFromJSON(markJSON.data),
});

const getLeafFromJSON = (leafJSON: LeafJSON): Leaf => ({
  key: generateKey(),
  text: leafJSON.text,
  marks: leafJSON.marks && leafJSON.marks.map(getMarkFromJSON),
});

const getNodeFromJSON = (nodeJSON: NodeJSON): Node => {
  switch (nodeJSON.object) {
    case 'block':
      return getBlockFromJSON(nodeJSON);

    case 'inline':
      return {
        object: 'inline',
        type: nodeJSON.type,
        key: generateKey(),
        data: getDataFromJSON(nodeJSON.data),
        nodes: nodeJSON.nodes && nodeJSON.nodes.map(getNodeFromJSON),
        get text() {
          return getTextFromNode(nodeJSON);
        },
      };

    case 'text':
    default: {
      const leaves = nodeJSON.leaves.map(getLeafFromJSON);
      return {
        object: 'text',
        key: generateKey(),
        leaves,
        get text() {
          return getTextFromNode(nodeJSON);
        },
        get marks() {
          return leaves.reduce(
            (marks, leaf) => marks.concat(leaf.marks || []),
            []
          );
        },
      };
    }
  }
};

const getDocumentFromJSON = (documentJSON: DocumentJSON): Document => ({
  object: 'document',
  key: generateKey(),
  data: getDataFromJSON(documentJSON.data),
  nodes: documentJSON.nodes && documentJSON.nodes.map(getBlockFromJSON),
});

export default {
  fromJSON: (valueJSON: ValueJSON): Value => ({
    object: 'value',
    key: generateKey(),
    data: getDataFromJSON(valueJSON.data),
    document: valueJSON.document && getDocumentFromJSON(valueJSON.document),
  }),
};
