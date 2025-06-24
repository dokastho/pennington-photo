// plugins/require-eula.js

import { LICENSE } from "./license.js";

export default {
  rules: {
    'requireLicense': {
      create(context) {
        return {
          Program(node) {
            const sourceCode = context.getSourceCode();
            
            if (!sourceCode.getText().startsWith(LICENSE)) {
              context.report({
                node,
                message: "This file needs to start with the LICENSE string."
              });
            }
          },
        };
      },
    }
  }
};
