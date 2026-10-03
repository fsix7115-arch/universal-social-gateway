import { ExampleConnector } from '../src/connectors/example/connector.js';
import { dbService } from '../src/services/database.js';
import assert from 'assert';

async function verify() {
  const connector = new ExampleConnector();
  const text = "hello world";
  const result = await connector.post({ text });
  
  assert(result.success === true);
  assert(result.taskId.startsWith('post-'));
  
  const db = dbService.getDb();
  const row = db.prepare('SELECT * FROM audit_logs WHERE event = ? AND message LIKE ?').get('post', `%${result.taskId}%`);
  assert(row !== undefined);
  console.log('Post verified:', result.taskId);
}
verify();
