/** @type {import('stylelint').Config} */
export default {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'selector-class-pattern': ['^[a-z][a-zA-Z0-9]*$', { message: 'Selector should be in camelCase' }]
  }
};
