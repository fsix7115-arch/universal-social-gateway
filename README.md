# Universal Social Gateway

A terminal-first, self-hosted, modular gateway for social media automation.

## Features
- **Modular Connectors:** Extendable platform support.
- **Job Engine:** Persistent job queue with retry handling.
- **Terminal UI:** Comprehensive CLI for all management tasks.
- **Secure:** SQLite persistence, no plaintext credential storage.

## Installation
```bash
git clone https://github.com/fsix7115-arch/universal-social-gateway
cd universal-social-gateway
pnpm install
pnpm build
```

## Commands
- `social doctor`: Check subsystem health.
- `social status`: View system statistics.
- `social post <platform> <text>`: Create a post via connector.
- `social jobs list`: View task queue.

## Roadmap
- **Complete:** Core Engine, Job/Queue System, CLI, Mock Connectors.
- **In Progress:** Browser Automation, Plugin Registry.
