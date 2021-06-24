(this["webpackJsonp@uiw/react-textarea-code-editor"]=this["webpackJsonp@uiw/react-textarea-code-editor"]||[]).push([[5],{592:function(e,a,d){"use strict";d.r(a),a.default="/* Using a single database query, find all the leads in\n    the database that have the same email address as any\n    of the leads being inserted or updated. */\nfor (Lead lead : [SELECT Email FROM Lead WHERE Email IN :leadMap.KeySet()]) {\n    Lead newLead = leadMap.get(lead.Email);\n    newLead.Email.addError('A lead with this email address already exists.');\n}\n"}}]);
//# sourceMappingURL=5.09e1043a.chunk.js.map