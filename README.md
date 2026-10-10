# Universal Social Gateway

Modular gateway for social media automation. One API key. Sixteen platforms. Built for AI agents.

<p align="center">
  <a href="https://github.com/fsix7115-arch/universal-social-gateway">
    <img src="https/img.shields.io/badge/Stars%200-%23e6e6e6?style=for-the-badge&logo=github&logoColor=white" alt="Stars">
  </a>
  <a href="https://github.com/fsix7115-arch/universal-social-gateway/stargazers">
    <img src="https/img.shields.io/badge/Forks%200-%23e6e6e6?style=for-the-badge&logo=github&logoColor=white" alt="Forks">
  </a>
</p>

## Quickstart

```bash
git clone https://github.com/fsix7115-arch/universal-social-gateway
cd universal-social-gateway
npm install
node dist/index.js doctor
```

## 📱 Supported Platforms

| Platform | API Endpoint | Status |
|----------|-------------|--------|
| **Instagram** | `/v1/accounts/{id}/instagram` | ✅ Skeleton provided |
| **X / Twitter** | `/v1/accounts/{id}/twitter` | ✅ Skeleton provided |
| **Facebook** | `/v1/accounts/{id}/facebook-page` | ✅ Skeleton provided |
| **WhatsApp** | `/v1/accounts/{id}/whatsapp` | 🚧 Coming soon |
| **Telegram** | `/v1/accounts/{id}/telegram-settings` | 🚧 Coming soon |
| **Threads** | `/v1/accounts/{id}/threads` | 🚧 Coming soon |
| **Pinterest** | `/v1/accounts/{id}/pinterest` | 🚧 Coming soon |
| **Reddit** | `/v1/accounts/{id}/reddit` | 🚧 Coming soon |
| **Snapchat** | `/v1/accounts/{id}/snapchat` | 🚧 Coming soon |
| **Bluesky** | `/v1/accounts/{id}/bluesky-settings` | 🚧 Coming soon |
| **Google Business** | `/v1/accounts/{id}/gmb-locations` | 🚧 Coming soon |
| **TikTok** | `/v1/accounts/{id}/discord-settings` | 🚧 Coming soon |
| **LinkedIn** | `/v1/accounts/{id}/linkedin` | 🚧 Coming soon |
| **YouTube** | 🚧 Coming soon | |
| **WordPress** | 🚧 Coming soon | |

## 🛠 Core Features

| Feature | Description |
|---------|-------------|
| **One API Key** | Single Zernio API key for all platforms |
| **SQLite Persistence** | Local data storage with job queue |
| **Modular Design** | Add/remove platforms without rebuilding |
| **Terminal-First** | CLI-driven, no GUI bloat |
| **AI Agent Ready** | Designed for Claude/Cursor/Copilot integration |
| **Job Queue** | Scheduled posts, batch processing |

## 🚀 Usage Examples

### Post to Instagram

```javascript
const { Zernio } = require('@zernio/node');

const zernio = new Zernio({
  apiKey: process.env.ZERNIO_API_KEY
});

// Post to Instagram
const result = await zernio.posts.createPost({
  body: {
    content: 'Hello Instagram from my AI agent! 🤖',
    platforms: [
      { platform: 'instagram', accountId: 'acc_123456' }
    ],
    publishNow: true
  }
});

console.log('Posted!', result);
```

### Check Account Status

```bash
node dist/index.js status --account-id acc_123456
```

### List All Connected Accounts

```bash
node dist/index.js accounts list
```

## 📦 Installation

```bash
# Clone
git clone https://github.com/fsix7115-arch/universal-social-gateway
cd universal-social-gateway

# Install dependencies
npm install

# Run doctor check
node dist/index.js doctor

# Start the gateway
node dist/index.js
```

## 🔑 Zernio Integration

This gateway uses your Zernio API key. Connect your social accounts via:

1. Sign up at [zernio.com](https://zernio.com)
2. Create API key at dashboard
3. Connect Instagram, X, Facebook accounts
4. Use the `ZERNIO_API_KEY` environment variable

```bash
export ZERNIO_API_KEY=sk_d92a995f0ff304402623877dc1689280084e180428c85a2955fbb9df125a793e
node dist/index.js
```

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/new-platform`)
3. Add platform skeleton in `src/platforms/`
4. Update `dist/index.js` with new platform handler
5. Commit and push
6. Open a Pull Request

## 🙏 Acknowledgments

- Built on top of [Zernio API](https://zernio.com)
- Inspired by the need for unified social media APIs
- Designed for AI agent ecosystems
