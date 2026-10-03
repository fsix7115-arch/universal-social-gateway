import { dbService } from '../src/services/database.js';
import assert from 'assert';

function verify() {
  const db = dbService.getDb();
  
  // 1. Add account
  db.prepare('INSERT INTO accounts (id, platform, display_name) VALUES (?, ?, ?)').run('acc1', 'mock', 'TestAcc');
  
  // 2. Verify account exists
  let acc = db.prepare('SELECT * FROM accounts WHERE id = ?').get('acc1');
  assert(acc !== undefined);
  
  // 3. Add session
  db.prepare('INSERT INTO sessions (id, account_id) VALUES (?, ?)').run('sess1', 'acc1');
  
  // 4. Verify session
  let sess = db.prepare('SELECT * FROM sessions WHERE id = ?').get('sess1');
  assert(sess !== undefined);
  
  console.log('Persistence verified in-memory');
}
verify();
