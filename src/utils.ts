import { rehype } from 'rehype';
// @ts-ignore
import rehypePrism from 'rehype-prism-2';
import refractor from 'refractor';

export const processHtml = (html: string, syntax: refractor.RefractorSyntax | undefined) => {
  return rehype()
    .data('settings', { fragment: true })
    .use(rehypePrism, { ignoreMissing: true, syntax: syntax })
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
