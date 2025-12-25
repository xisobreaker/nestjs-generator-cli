import { Command } from 'commander';
import { generateCode } from './generator/generator';

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

    program.parse(process.argv);
  }
};

main();
