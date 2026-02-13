import coreWebVitals from 'eslint-config-next/core-web-vitals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...coreWebVitals,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    ignores: ['.next/**', 'dist/**', 'build/**', 'node_modules/**', 'src/generated/**'],
  },
];

export default eslintConfig;
