import { readFileSync } from 'fs';

const html = readFileSync('./src/index.html', 'utf8');

export default function replace() {
  return {
    name: 'prepend HTML',

    renderChunk(code) {
      return html.replace('HERE_GOES_CODE', code);
    },
  };
}
