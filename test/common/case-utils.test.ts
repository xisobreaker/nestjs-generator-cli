import { toPascalCase, toCamelCase, toSnakeCase, toKebabCase } from '../../src/common/case-utils';

describe('Case Utils', () => {
  describe('toPascalCase', () => {
    it('snake_case to PascalCase', () => {
      expect(toPascalCase('user_name')).toBe('UserName');
      expect(toPascalCase('user_name_123')).toBe('UserName123');
      expect(toPascalCase('USER_NAME')).toBe('UserName');
    });

    it('empty string', () => {
      expect(toPascalCase('')).toBe('');
    });
    it('single word', () => {
      expect(toPascalCase('user')).toBe('User');
    });
  });

  describe('toLowerCamelCase', () => {
    it('snake_case to camelCase', () => {
      expect(toCamelCase('user_name')).toBe('userName');
      expect(toCamelCase('user_name_123')).toBe('userName123');
      expect(toCamelCase('USER_NAME')).toBe('userName');
    });

    it('empty string', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('single word', () => {
      expect(toCamelCase('user')).toBe('user');
    });
  });

  describe('toSnakeCase', () => {
    it('camelCase to snake_case', () => {
      expect(toSnakeCase('userName')).toBe('user_name');
    });

    it('PascalCase to snake_case', () => {
      expect(toSnakeCase('UserName')).toBe('user_name');
    });
  });

  describe('toKebabCase', () => {
    it('camelCase to kebab-case', () => {
      expect(toKebabCase('userName')).toBe('user-name');
    });

    it('PascalCase to kebab-case', () => {
      expect(toKebabCase('UserName')).toBe('user-name');
    });
  });
});