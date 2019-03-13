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
  Node,
  NodeJSON,
  LeafJSON,
  Leaf,
} from './types';
import {generateKey} from './key-generator';

const getDataFromJSON = (dataJSON: ?DataJSON): Data =>
  dataJSON ? new Map(Object.entries(dataJSON)) : new Map();

const getBlockFromJSON = (blockJSON: BlockJSON): Block => ({
  object: 'block',
  type: blockJSON.type,
  key: generateKey(),
  data: getDataFromJSON(blockJSON.data),
  nodes: blockJSON.nodes && blockJSON.nodes.map(getNodeFromJSON),
});

const getLeafFromJSON = (leafJSON: LeafJSON): Leaf => ({
  ...leafJSON,
  key: generateKey(),
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
      };

    case 'text':
    default:
      return {
        object: 'text',
        key: generateKey(),
        leaves: nodeJSON.leaves.map(getLeafFromJSON),
      };
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
