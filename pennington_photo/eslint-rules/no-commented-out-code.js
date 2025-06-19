// plugins/no-comment-out.js

import { LICENSE } from "./license.js";

const LICENSE_COMMENT = {
  type: 'Block',
  value: LICENSE,
  start: 0,
  end: 41,
}

export default {
  rules: {
    'noSingleLineComments': {
      create(context) {
        // Rule implementation goes here
        return {
          Program(node) {
            const comments = context.getSourceCode().getAllComments();

            comments.forEach(comment => {
              const text = comment.value.trim();

              // Detect patterns of commented-out code
              if (comment.type === "Line") {
                context.report({
                  node: comment,
                  message: 'Single line comments are not allowed.',
                });
              }
            });
          }
        };
      }
    },
    'noCommentOut': {
      create(context) {
        // Rule implementation goes here
        return {
          Program(node) {
            const comments = context.getSourceCode().getAllComments();

            if (comments.length > 0) {
              // ignore license
              const firstComment = comments[0];
              const { type, value, start, end } = LICENSE_COMMENT;
              if (
                firstComment.type === type &&
                `/*${firstComment.value}*/` === value &&
                firstComment.start === start &&
                firstComment.end === end
              ) {
                comments.splice(0, 1);
              }
            }

            comments.forEach(comment => {
              const text = comment.value.trim();

              // permit radar links with a fixme
              const firstLine = text.split('\n')[0]
              const fixmeRadarExpr = /FIXME:\s+rdar:\/\/[0-9]+/i;
              if (fixmeRadarExpr.test(firstLine)) { } // ignore
              else if (text.startsWith('eslint-disable-next-line')) { } // ignore
              else if (firstLine.startsWith('FIXME:') && !fixmeRadarExpr.test(firstLine)) {
                context.report({
                  node: comment,
                  message: 'FIXME\'s need a Radar link. ie:\n\n/* FIXME: rdar//xxxxxxxx\ncode here...\n*/\n',
                });
              }

              else if (text.startsWith('TODO:')) {
                context.report({
                  node: comment,
                  message: 'Commenting a TODO is not allowed. Please file a radar to track this issue and paste the link along with a FIXME, ie:\n\n/* FIXME: rdar//xxxxxxxx\ncode here...\n*/\n',
                });
              }

              // Detect patterns of commented-out code
              else {
                context.report({
                  node: comment,
                  message: 'Commenting code without a radar link is not allowed.\n\nTo leave a comment for code context, ignore the error for this line. Otherwise, please create a radar to track this code if it is needed or remove it if not. ie:\n\n/* FIXME: rdar//xxxxxxxx\ncode here...\n*/\n',
                });
              }
            });
          }
        };
      }
    }
  }
};
