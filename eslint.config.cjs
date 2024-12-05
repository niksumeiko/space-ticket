const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const typescript = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-config-prettier');

module.exports = [{
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        },
        globals: {
            ...react.configs.recommended.globals,
            ...reactHooks.configs.recommended.globals
        }
    },
    plugins: {
        react,
        'react-hooks': reactHooks,
        '@typescript-eslint': typescript
    },
    rules: {
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
        ...reactHooks.configs.recommended.rules,
        ...typescript.configs.recommended.rules,

        // Customize additional rules
        'no-unused-vars': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    ignores: [
        'src/common/context/',
        'node_modules/',
        'public/',
        'dist/',
        '*.config.js',
        '*.config.cjs'
    ],
}, prettier];
