import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Import sorting rules
      'prettier/prettier': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // Packages from node_modules
            'internal', // Absolute imports within the project (using paths alias)
            'parent', // Imports from parent directories
            'sibling', // Imports from sibling directories
            'index', // Index imports
            'object', // Object imports
            'type', // Type imports
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            // Optional: if you're using path aliases, define them here
            // Example for a common 'components' alias
            // {
            //   'pattern': '@/components/**',
            //   'group': 'internal',
            //   'position': 'before'
            // },
          ],
        },
      ],
    },
  },
  // TypeScript-specific configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Next.js doesn't need explicit return types
      '@typescript-eslint/no-explicit-any': 'warn', // Avoid using 'any' type
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }], // Warn about unused variables, but ignore those starting with underscore
      '@typescript-eslint/no-non-null-assertion': 'warn', // Warn about non-null assertions
      '@typescript-eslint/consistent-type-imports': ['error', { 
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      }], // Enforce consistent type imports
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Prefer interfaces over types
      '@typescript-eslint/ban-ts-comment': ['error', { 
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
      }], // Only allow TS-ignore comments with descriptions
    },
  },
];

export default eslintConfig;
