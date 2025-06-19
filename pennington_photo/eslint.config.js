// eslint.config.js

import noCommentedOutCode from './eslint-rules/no-commented-out-code.js';
import needLicense from './eslint-rules/require-license.js'
import noConsoleLog from './eslint-rules/no-console-log.js'
import babelParser from "@babel/eslint-parser";
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: [
      "**/src/*.jsx",
      "**/libs/*.jsx",
    ],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-react"]
        }
      },
    },
    plugins: {
      needLicense,
      noCommentedOutCode,
      noConsoleLog,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      "noCommentedOutCode/noCommentOut": "error",
      "noCommentedOutCode/noSingleLineComments": "error",
      "noConsoleLog/noConsoleLog": "error",
      "needLicense/requireLicense": "error",
    }
  }
];