import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
<<<<<<< HEAD
      globals: globals.browser,
=======
      globals: {
        ...globals.browser,
        ...globals.node,
      },
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
