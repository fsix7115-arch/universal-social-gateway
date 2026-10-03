import { MockConnector } from '../src/connectors/mock.js';
import assert from 'assert';

async function testMock() {
  const mock = new MockConnector();
  assert(await mock.healthCheck() === true);
  const res = await mock.post({ text: 'test' });
  assert(res.success === true);
  console.log('Mock connector tests passed');
}
testMock();
