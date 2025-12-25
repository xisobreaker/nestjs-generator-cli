import _ from 'lodash';

/**
 * @brief 将字符串转换为驼峰命名法（camelCase）
 * 
 * @param str 输入字符串
 * @returns 驼峰命名法表示的字符串
 */
export const toCamelCase = (str: string) => {
  return _.camelCase(str);
}

/**
 * @brief 将字符串转换为帕斯卡命名法（PascalCase）
 * 
 * @param str 输入字符串
 * @returns 帕斯卡命名法表示的字符串
 */
export const toPascalCase = (str: string) => {
  return _.upperFirst(_.camelCase(str));
}

/**
 * @brief 将字符串转换为下划线命名法（snake case）
 * 
 * @param str 输入字符串
 * @returns 下划线命名法表示的字符串
 */
export const toSnakeCase = (str: string) => {
  return _.snakeCase(str);
}

/**
 * @brief 将字符串转换为短横线命名法（kebab case）
 * 
 * @param str 输入字符串
 * @returns 短横线命名法表示的字符串
 */
export const toKebabCase = (str: string) => {
  return _.kebabCase(str);
}
