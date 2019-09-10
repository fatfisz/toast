import { createFilter } from 'rollup-pluginutils';

export default function replace(options = {}) {
  const { include = '**/*.json' } = options;
  const filter = createFilter(include, options.exclude);

  return {
    name: 'strip SpriteStack',

    transform(code, id) {
      if (!filter(id)) {
        return null;
      }

      const parsed = JSON.parse(code);
      if (parsed.fileType !== 'SpriteStackModel' || parsed.formatVersion !== 2) {
        return null;
      }

      delete parsed.formatVersion;
      delete parsed.fileType;
      delete parsed.size;
      delete parsed.bounds;

      for (const part of parsed.parts) {
        delete part.size;
        delete part.uuid;
        delete part.hidden;
      }

      return JSON.stringify(parsed);
    },
  };
}
