import { Command } from 'commander';
import chalk from 'chalk';
import { dbService } from './services/database.js';
import { registry } from './connectors/registry.js';
import { MockConnector } from './connectors/mock.js';
import { ExampleConnector } from './connectors/example/connector.js';
import { InstagramConnector } from './connectors/instagram.js';

const program = new Command();
program
  .name('social')
  .description('Universal Social Gateway CLI')
  .version('1.0.0');

program.command('doctor')
  .description('Check subsystem health')
  .action(() => {
    console.table({
      database: { status: dbService.getDb().open ? 'OK' : 'FAIL' },
      queue: { status: 'OK' }
    });
  });

program.command('list-platforms')
  .description('List supported social platforms')
  .action(() => {
    console.log(chalk.blue('Supported Platforms:'));
    registry.getConnectors().forEach(c => console.log(`- ${c.id}: ${c.name}`));
  });

program.command('post')
  .description('Post to a platform')
  .argument('<platform>', 'platform ID')
  .argument('<text>', 'post content')
  .action(async (platform, text) => {
    let connector;
    if (platform === 'mock') connector = new MockConnector();
    else if (platform === 'example') connector = new ExampleConnector();
    else if (platform === 'instagram') connector = new InstagramConnector();
    else { console.error(chalk.red('Unsupported platform')); return; }
    
    const res = await connector.post({ text });
    if (res.success) console.log(chalk.green('✔ ') + `Post ID: ${res.taskId}`);
    else console.error(chalk.red('✖ ') + `Error: ${res.message}`);
  });

program.parse();
