/*eslint-env commonjs*/
/*eslint quote-props: ['error', "always"] */

module.exports = {
  'root': true,

  // https://qiita.com/kurkuru/items/d4eebd34f0898c6a2d5a
  // this is required to accept `import.meta.url`,
  // dynamic import via `import()`, and so on.
  'parser': '@babel/eslint-parser',

  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'requireConfigFile': false,
  },

  'env': {
    'es6': true,
    'node': true,
  },

  'plugins': [
    'import',
  ],

  'settings': {
    'import/resolver': {
      'babel-module': {
        'root': ['./'],
      }
    }
  },

  'rules': {
    // stylisitc problem
    'indent': ['warn', 2, {
      'SwitchCase': 1,
      'MemberExpression': 1,
      'CallExpression': {
        'arguments': 'first',
      },
      'VariableDeclarator': {
        'var': 2,
        'let': 2,
        'const': 3,
      }
    }],
    'quotes': ['warn', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true,
    }],

    'no-const-assign': 'error',
    'prefer-const': ['warn', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],
    'no-var': 'error',
    'no-unused-vars': ['warn', { // Not make an error for debugging.
      'vars': 'all',
      'args': 'after-used',
      'argsIgnorePattern': '^_',
      'caughtErrors': 'all',
      'caughtErrorsIgnorePattern': '^_', // Allow `catch (_e) {...}`
    }],
    'no-use-before-define': ['error', { // the measure for Temporary Dead Zone
      'functions': false, //  Function declarations are hoisted.
      'classes': true, // Class declarations are not hoisted. We should warn it.
    }],
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-undef': ['error', {
      'typeof': true,
    }],

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md
    'import/default': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
    'import/namespace': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
    'import/no-duplicates': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
    'import/export': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'always'],
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    'import/first': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md
    'import/named': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
    'import/no-named-as-default': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
    'import/no-named-as-default-member': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md
    'import/no-cycle': ['warn', {
      // If we comment out this, `maxDepth` is `Infinity`.
      //'maxDepth': 1,
    }],
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
    'import/no-self-import': 'error',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': ['error', {
      'caseSensitive': true,
    }],
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-useless-path-segments.md
    'import/no-useless-path-segments': 'error',
  }
};
