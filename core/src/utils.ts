import { PluggableList, Pluggable } from 'unified';
import { rehype } from 'rehype';

export const processHtml = (html: string, plugins: PluggableList = [] as Pluggable[]) => {
  return rehype()
    .data('settings', { fragment: true })
    .use([...plugins])
    .processSync(`${html}`)
    .toString();
};

export function htmlEncode(sHtml: string) {
  return sHtml
    .replace(/```(tsx?|jsx?|html|xml)(.*)\s+([\s\S]*?)(\s.+)?```/g, (str: string) => {
      return str.replace(
        /[<&"]/g,
        (c: string) => (({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }) as Record<string, string>)[c],
      );
    })
    .replace(
      /[<&"]/g,
      (c: string) => (({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }) as Record<string, string>)[c],
    );
}

export function stopPropagation(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  e.stopPropagation();
  e.preventDefault();
}
