// @flow
import * as React from 'react';
import type {Value, Data} from './value';
import type {Plugin} from './plugin';

export default class Editor {
  constructor(value: Value) {
    const data: Data = value.data
      ? value.data instanceof Map
        ? value.data
        : new Map(Object.entries(value.data))
      : new Map();
    this.value = Object.assign(value, {data});
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
