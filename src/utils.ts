// @ts-ignore
import rehype from 'rehype';
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';

export const processHtml = (html: string) => {
  return rehype()
    .data('settings', { fragment: true })
    .use(rehypePrism, { ignoreMissing: true })
    .processSync(`${html}`)
    .toString();
};

// function htmlEncode(html: string) {
//   const temp = document.createElement ('div');
//   (temp.textContent !== undefined) ? (temp.textContent = html) : (temp.innerText = html);
//   const output = temp.innerHTML;
//   return output;
// }

export function htmlEncode(sHtml: string) {
  return sHtml.replace(
    /[<>&"]/g,
    (c: string) => (({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' } as Record<string, string>)[c]),
  );
}

export function stopPropagation(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  e.stopPropagation();
  e.preventDefault();
}
