import inquirer from 'inquirer';

/**
 *
 */
export const choicePrompt = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: '请选择操作',
      choices: ['生成代码'],
    },
  ]);
};
