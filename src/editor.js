// @flow
import type {Value} from './types';
import type {Plugin, NextFn} from './plugin';

export type Command<K> = $NonMaybeType<$ElementType<Plugin, K>>;
type CommandProps<Fn> = $Call<<A, R>((A, Object, NextFn) => R) => A, Fn>;

export default class Editor {
  value: Value;

  constructor(value: Value) {
    this.value = value;
  }

  run = <Key: $Keys<Plugin>, Props: CommandProps<Command<Key>>>(
    plugins: Array<Plugin>,
    command: Key,
    props: Props
  ): $Call<Command<Key>, Props, Object, NextFn> => {
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

      return pluginCommand(props, this, next);
    };

    // $FlowFixMe ¯\_(ツ)_/¯
    return next();
  };
}
