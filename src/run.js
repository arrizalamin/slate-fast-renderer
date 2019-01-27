// @flow
import * as React from 'react';
import type {Plugin} from './plugin';

const run = (
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
    return pluginCommand(props, {}, next);
  };

  return next() || null;
};

export default run;
