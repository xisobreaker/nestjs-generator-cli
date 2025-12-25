import inquirer from 'inquirer';

interface InquirerOption {
  key: string;
  value: any;
}

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

/**
 * 复选框
 */
export const checkboxPrompt = (message: string, options: InquirerOption[]) => {
  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'data',
      message,
      choices: options.map((o) => o.key),
    },
  ]).then((ret) => options.filter((o) => ret.data.includes(o.key)));
}