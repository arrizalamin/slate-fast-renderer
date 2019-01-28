// @flow
import * as React from 'react';
import type {Value} from './value';
import type {Plugin} from './plugin';

export default class Editor {
  constructor(value: Value) {
    this.value = value;
  }

  value: Value;

  run = (
    plugins: Array<Plugin>,
    command: $Keys<Plugin>,
    props: *
  ): ?React.Node => {
    let i = 0;
    const next = () => {
      const plugin = plugins[i];
      i = i + 1;
      if (!plugin) {
        return null;
      }
      const pluginCommand = plugin[command];
      if (!pluginCommand) {
        return next();
      }

      // $FlowFixMe
      return pluginCommand(props, this, next);
    };

    return next() || null;
  };
}
