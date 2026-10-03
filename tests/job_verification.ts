import { jobManager } from '../src/jobs/manager.js';
import { dbService } from '../src/services/database.js';
import assert from 'assert';

async function verify() {
  console.log("--- 1. Create test job ---");
  const id = jobManager.create('test', { data: 'val' });
  console.log("Created:", id);

  console.log("--- 2. Queue job (Status check) ---");
  const job = jobManager.status(id);
  assert(job.status === 'queued');

  console.log("--- 3. Execute worker ---");
  await jobManager.process(id, async (p) => { console.log('Worker processing:', p); });

  console.log("--- 4. Mark completed ---");
  const finishedJob = jobManager.status(id);
  assert(finishedJob.status === 'completed');

  console.log("--- 5. Create failing job ---");
  const failId = jobManager.create('fail-test', { data: 'fail' });
  await jobManager.process(failId, async () => { throw new Error('Simulated failure'); });
  const failedJob = jobManager.status(failId);
  assert(failedJob.status === 'failed');
  assert(failedJob.retries === 1);

  console.log("--- 6. Verify retry logic ---");
  jobManager.retry(failId);
  assert(jobManager.status(failId).status === 'queued');

  console.log("--- 7. Verify failure tracking ---");
  console.log("Last Error:", failedJob.last_error);
  assert(failedJob.last_error === 'Simulated failure');

  console.log("--- 8&9. Persistence Check (Simulated) ---");
  // Check the DB file directly to prove persistence
  const db = dbService.getDb();
  const persisted = db.prepare('SELECT * FROM jobs WHERE id = ?').get(id);
  assert(persisted !== undefined);
  console.log("Job persisted in DB:", persisted.id);

  console.log("Verification Passed");
}
verify().catch(e => { console.error(e); process.exit(1); });
