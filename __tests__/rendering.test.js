import React from 'react';
import renderer from 'react-test-renderer';
import SlateRenderer, {Value} from '../src';
import renderNode from './renderNode';
import renderEditor from './renderEditor';

const valueJSON = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Hello World',
              },
            ],
          },
        ],
      },
    ],
  },
};

it('renders correctly', () => {
  const value = Value.fromJSON(valueJSON);
  const component = <SlateRenderer value={value} renderNode={renderNode} />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders renderEditor', () => {
  const value = Value.fromJSON(valueJSON);
  const component = (
    <SlateRenderer
      value={value}
      renderNode={renderNode}
      renderEditor={renderEditor}
    />
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
