import { dbService } from '../services/database.js';
import { logger } from '../services/logger.js';

export const jobManager = {
  list: () => dbService.getDb().prepare('SELECT * FROM jobs').all(),
  status: (id: string) => dbService.getDb().prepare('SELECT * FROM jobs WHERE id = ?').get(id),
  create: (type: string, payload: any) => {
    const id = Math.random().toString(36).substring(7);
    dbService.getDb().prepare('INSERT INTO jobs (id, type, payload) VALUES (?, ?, ?)').run(id, type, JSON.stringify(payload));
    return id;
  },
  retry: (id: string) => {
    dbService.getDb().prepare('UPDATE jobs SET status = \'queued\', retries = 0, last_error = NULL WHERE id = ?').run(id);
  },
  cancel: (id: string) => {
    dbService.getDb().prepare('UPDATE jobs SET status = \'cancelled\' WHERE id = ?').run(id);
  },
  cleanup: () => {
    dbService.getDb().prepare('DELETE FROM jobs WHERE status IN (\'completed\', \'cancelled\')').run();
  },
  process: async (id: string, fn: (payload: any) => Promise<void>) => {
    try {
      dbService.getDb().prepare('UPDATE jobs SET status = \'running\', updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
      const job = dbService.getDb().prepare('SELECT * FROM jobs WHERE id = ?').get(id);
      await fn(JSON.parse(job.payload));
      dbService.getDb().prepare('UPDATE jobs SET status = \'completed\', updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
      logger.info('Job ' + id + ' completed');
    } catch (e: any) {
      dbService.getDb().prepare('UPDATE jobs SET status = \'failed\', retries = retries + 1, last_error = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(e.message, id);
      logger.error('Job ' + id + ' failed: ' + e.message);
    }
  }
};
