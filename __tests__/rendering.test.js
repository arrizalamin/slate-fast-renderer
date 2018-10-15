import React from 'react';
import renderer from 'react-test-renderer';
import SlateRenderer from '../src';
import renderNode from './renderNode';

const node = {
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
  const component = <SlateRenderer value={node} renderNode={renderNode} />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
