const rules = {
  // https://github.com/eslint/eslint/issues/15299#issuecomment-968099681
  "indent": ["error", 2, { "SwitchCase": 1, "ignoredNodes": ["PropertyDefinition"] }],
}

module.exports = {
  extends: '@chatie',
  rules,
}
