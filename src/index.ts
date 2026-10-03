import { Command } from 'commander';
import { dbService } from './services/database.js';
import { jobManager } from './jobs/manager.js';
import { registry } from './connectors/registry.js';
import { MockConnector } from './connectors/mock.js';
import { ExampleConnector } from './connectors/example/connector.js';
import { pluginManager } from './plugins/manager.js';

const program = new Command();
program.name('social').version('0.1.0');

// Doctor
program.command('doctor').action(() => {
  const subsystems = { database: !!dbService.getDb().open, queue: true, connectors: true };
  console.table(subsystems);
});

// Status
program.command('status').action(() => {
  const stats = {
    accounts: dbService.getDb().prepare('SELECT count(*) as c FROM accounts').get().c,
    sessions: dbService.getDb().prepare('SELECT count(*) as c FROM sessions').get().c,
    connectors: registry.getConnectors().length,
    plugins: pluginManager.list().length,
    jobs: jobManager.list().length
  };
  console.table(stats);
});

// Jobs
const jobs = program.command('jobs');
jobs.command('list').action(() => console.table(jobManager.list()));
jobs.command('status <id>').action((id) => console.log(jobManager.status(id)));
jobs.command('create-test').action(() => {
  const id = jobManager.create('test', { data: 'test-data' });
  console.log('Job created:', id);
});

// Connectors
const connectors = program.command('connectors');
connectors.command('list').action(() => console.table(registry.getConnectors()));

// Plugins
const plugins = program.command('plugins');
plugins.command('list').action(() => console.table(pluginManager.list()));

// Post
program.command('post <platform> <text>').action(async (platform, text) => {
  let connector;
  if (platform === 'mock') connector = new MockConnector();
  else if (platform === 'example') connector = new ExampleConnector();
  else throw new Error('Unsupported platform');
  
  const res = await connector.post({ text });
  dbService.getDb().prepare('INSERT INTO audit_logs (event, message) VALUES (?, ?)').run('post', JSON.stringify({ taskId: res.taskId, text }));
  console.log('Post ID:', res.taskId);
});

program.parse();
