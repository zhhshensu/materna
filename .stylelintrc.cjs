module.exports = {
  extends: [
    'stylelint-config-standard', // 配置styleklint拓展插件
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件
    'stylelint-config-prettier', // 配置stylelint和 prettier兼容
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
   /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {

  }
}
