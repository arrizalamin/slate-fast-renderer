// @flow
import * as React from 'react';
import type {RenderNodeProps} from '../plugin';

const renderNode = (props: RenderNodeProps): React.Node => props.children;

export default renderNode;
