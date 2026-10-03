import Database from 'better-sqlite3';
export class DatabaseService {
  private db: Database.Database;
  constructor(path: string = 'usg.db') {
    this.db = new Database(path);
    this.init();
  }
  private init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, platform TEXT NOT NULL, display_name TEXT);
      CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, account_id TEXT);
      CREATE TABLE IF NOT EXISTS connectors (id TEXT PRIMARY KEY, name TEXT NOT NULL, enabled INTEGER DEFAULT 0, capabilities TEXT);
      CREATE TABLE IF NOT EXISTS plugins (id TEXT PRIMARY KEY, name TEXT NOT NULL, version TEXT NOT NULL, enabled INTEGER DEFAULT 0, manifest TEXT);
      CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, type TEXT NOT NULL, payload TEXT, status TEXT DEFAULT 'queued', retries INTEGER DEFAULT 0, last_error TEXT);
      CREATE TABLE IF NOT EXISTS audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT, message TEXT);
    `);
  }
  getDb(): any { return this.db; }
}
export const dbService = new DatabaseService();
