(this["webpackJsonp@uiw/react-textarea-code-editor"]=this["webpackJsonp@uiw/react-textarea-code-editor"]||[]).push([[21],{608:function(t,n,e){"use strict";e.r(n),n.default='\n<div class="entry">\n\t<h1>{{title}}</h1>\n\t{{#if author}}\n\t<h2>{{author.firstName}} {{author.lastName}}</h2>\n\t{{else}}\n\t<h2>Unknown Author</h2>\n\t{{/if}}\n\t{{contentBody}}\n</div>\n\n{{#unless license}}\n  <h3 class="warning">WARNING: This entry does not have a license!</h3>\n{{/unless}}\n\n<div class="footnotes">\n\t<ul>\n\t\t{{#each footnotes}}\n\t\t<li>{{this}}</li>\n\t\t{{/each}}\n\t</ul>\n</div>\n\n<h1>Comments</h1>\n\n<div id="comments">\n\t{{#each comments}}\n\t<h2><a href="/posts/{{../permalink}}#{{id}}">{{title}}</a></h2>\n\t<div>{{body}}</div>\n\t{{/each}}\n</div>\n'}}]);
//# sourceMappingURL=21.01e88953.chunk.js.map