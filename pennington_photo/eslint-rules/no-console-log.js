// plugins/no-console-log.js

export default {
  rules: {
    'noConsoleLog': {
      create(context) {
        return {
          CallExpression(node) {
            if (
              node.callee.type === 'MemberExpression' &&
              node.callee.object.type === 'Identifier' &&
              node.callee.object.name === 'console' &&
              node.callee.property.type === 'Identifier' &&
              node.callee.property.name === 'log'
            ) {
              context.report({
                node,
                message: `console.${node.callee.property.name} is disabled.`,
              })
            }
            else if (
              node.callee.type === 'MemberExpression' &&
              node.callee.object.type === 'Identifier' &&
              node.callee.object.name === 'console' &&
              node.callee.property.type === 'Identifier' &&
              node.callee.property.name === 'debug'
            ) {
              context.report({
                node,
                message: `console.${node.callee.property.name} is disabled.`,
              })
            }
            else if (
              node.callee.type === 'MemberExpression' &&
              node.callee.object.type === 'Identifier' &&
              node.callee.object.name === 'console' &&
              node.callee.property.type === 'Identifier' &&
              node.callee.property.name === 'info'
            ) {
              context.report({
                node,
                message: `console.${node.callee.property.name} is disabled.`,
              })
            }
          }
        }
      }
    },
  }
}
