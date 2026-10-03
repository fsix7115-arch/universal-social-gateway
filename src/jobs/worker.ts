import { dbService } from '../services/database.js';
import { logger } from '../services/logger.js';

export const jobManager = {
  create: (id: string, type: string, payload: any) => {
    dbService.getDb().prepare('INSERT INTO jobs (id, type, payload) VALUES (?, ?, ?)').run(id, type, JSON.stringify(payload));
  },
  list: () => dbService.getDb().prepare('SELECT * FROM jobs').all(),
  execute: async (id: string) => {
    const job = dbService.getDb().prepare('SELECT * FROM jobs WHERE id = ?').get(id);
    dbService.getDb().prepare('UPDATE jobs SET status = "running" WHERE id = ?').run(id);
    
    try {
        // Mock execution
        if (job.type === 'fail') throw new Error('Test Failure');
        dbService.getDb().prepare('UPDATE jobs SET status = "completed" WHERE id = ?').run(id);
        logger.info(`Job ${id} completed`);
    } catch (e: any) {
        dbService.getDb().prepare('UPDATE jobs SET status = "failed", retries = retries + 1, error = ? WHERE id = ?').run(e.message, id);
        logger.error(`Job ${id} failed`);
    }
  },
  cleanup: () => {
    dbService.getDb().prepare('DELETE FROM jobs WHERE status IN ("completed", "failed")').run();
  }
};
