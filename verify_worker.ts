import { jobManager } from './src/jobs/manager.js';
async function test() {
  const id = jobManager.create('test', { data: 'hello' });
  await jobManager.process(id, async (p) => { console.log('Processing:', p); });
  console.log('Worker test complete');
}
test();
