import { dbService } from '../services/database.js';
import { logger } from '../services/logger.js';

export const pluginManager = {
  list: () => dbService.getDb().prepare('SELECT * FROM plugins').all(),
  info: (id: string) => dbService.getDb().prepare('SELECT * FROM plugins WHERE id = ?').get(id),
  enable: (id: string) => {
    const res = dbService.getDb().prepare('UPDATE plugins SET enabled = 1 WHERE id = ?').run(id);
    logger.info(`Enabled ${id}, changes: ${res.changes}`);
    return res.changes > 0;
  },
  disable: (id: string) => {
    const res = dbService.getDb().prepare('UPDATE plugins SET enabled = 0 WHERE id = ?').run(id);
    logger.info(`Disabled ${id}, changes: ${res.changes}`);
    return res.changes > 0;
  },
  register: (manifest: any) => {
    dbService.getDb().prepare('INSERT OR REPLACE INTO plugins (id, name, version, manifest) VALUES (?, ?, ?, ?)').run(manifest.id, manifest.name, manifest.version, JSON.stringify(manifest));
  }
};
