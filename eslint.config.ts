import antfuConfig from '@antfu/eslint-config'

export default antfuConfig(
  {
    typescript: true,
    react: false,
    e18e: false,
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
)
