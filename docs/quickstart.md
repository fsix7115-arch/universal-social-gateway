# Quickstart Guide

## Prerequisites
- Node.js 18+
- pnpm
- SQLite

## Installation

```bash
# Clone the repository
git clone https://github.com/fsix7115-arch/universal-social-gateway
cd universal-social-gateway

# Install dependencies
pnpm install

# Build the project
pnpm build
```

## First Steps

### 1. Check System Health
```bash
node dist/index.js doctor
```
Expected: Shows database, queue, and connector status.

### 2. View System Statistics
```bash
node dist/index.js status
```
Expected: Shows counts of accounts, sessions, connectors, plugins, and jobs.

### 3. Create a Post (Mock)
```bash
node dist/index.js post mock "Hello World"
```
Expected: Returns a Post ID and saves to database.

### 4. Verify Persistence
```bash
sqlite3 usg.db "SELECT * FROM audit_logs WHERE event='post' ORDER BY id DESC LIMIT 1;"
```
Expected: Shows the post record with taskId and text.

## Demo Flow

See `docs/evidence/demo-flow.txt` for complete workflow proof with expected outputs.

## Available Commands

| Command | Description |
|---------|-------------|
| `social doctor` | Check subsystem health |
| `social status` | View system statistics |
| `social post <platform> <text>` | Create a post via connector |
| `social jobs list` | View task queue |
| `social jobs create-test` | Create a test job |
| `social connectors list` | List registered connectors |
| `social plugins list` | List installed plugins |

## Connectors

| Connector | Status |
|-----------|--------|
| mock | ✅ Working |
| example | ✅ Working (Post/Comment) |
