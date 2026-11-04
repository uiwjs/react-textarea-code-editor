import rehypePrism from 'rehype-prism-plus';
import type { PluggableList } from 'unified';
import { htmlEncode, processHtml } from '../utils';

it.each([
  '```html\n<div title="x&y" />\n```',
  '<div>&lt; & "quoted"</div>',
  '```js\nif (a < b && b > 0) {}\n```',
])('preserves preview text and escapes markup: %s', (value) => {
  const configurations: PluggableList[] = [[], [[rehypePrism, { ignoreMissing: true }]]];
  for (const plugins of configurations) {
    const container = document.createElement('div');
    container.innerHTML = processHtml(`<pre><code class="language-markdown">${htmlEncode(value)}</code></pre>`, plugins);
    expect(container.querySelector('code')?.textContent).toBe(value);
    expect(container.querySelector('code > div')).toBeNull();
  }
});
