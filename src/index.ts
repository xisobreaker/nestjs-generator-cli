import { Command } from 'commander';
import { generateCode } from './generator/generator';
import { initProject } from './initialize/initializer';

const main = async () => {
  if (process.env.NODE_ENV === 'development') {
    await generateCode();
  } else {
    const program = new Command();
    program.command('code')
      .description('生成代码')
      .action(async () => {
        await generateCode();
      });

    program.command('init')
      .description('初始化项目')
      .action(async () => {
        await initProject();
      });

    program.parse(process.argv);
  }
};

main();
