// @flow
import * as React from 'react';
import type {RenderTextProps} from '../plugin';

const renderText = (props: RenderTextProps): ?React.Node => (
  <React.Fragment key={props.attributes.key}>{props.text}</React.Fragment>
);

export default renderText;
