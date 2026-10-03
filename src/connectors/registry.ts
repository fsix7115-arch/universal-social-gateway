import { dbService } from '../services/database.js';
import { MockConnector } from './mock.js';
import { ExampleConnector } from "./example/connector.js";
export const registry = {
  getConnectors: () => dbService.getDb().prepare('SELECT * FROM connectors').all(),
  enable: (id: string) => dbService.getDb().prepare('UPDATE connectors SET enabled = 1 WHERE id = ?').run(id),
  disable: (id: string) => dbService.getDb().prepare('UPDATE connectors SET enabled = 0 WHERE id = ?').run(id),
  register: (id: string, name: string, caps: any) => dbService.getDb().prepare('INSERT OR REPLACE INTO connectors (id, name, enabled, capabilities) VALUES (?, ?, 0, ?)').run(id, name, JSON.stringify(caps))
};
registry.register('mock', 'Mock Connector', new MockConnector().capabilities);
registry.register("example", "Example Connector", new ExampleConnector().capabilities);
