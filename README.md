# AgentBear - AI Agent Platform

🐻 Open-source AI agents that find opportunities across crypto markets.

**This is the website/setup wizard.** For the agent backend, see [agentbear-agent](https://github.com/jpmoregain-eth/agentbear-agent).

---

## What is AgentBear?

AgentBear is a split architecture:

1. **Website** (this repo) - Setup wizard UI + landing page
2. **Agent** ([agentbear-agent](https://github.com/jpmoregain-eth/agentbear-agent)) - Python backend

User visits the website → Fills out setup wizard → Runs agent locally → Agent analyzes crypto markets via Telegram

---

## Live Site

🌐 **https://agentbear.vercel.app**

- **Landing page** - Learn about AgentBear
- **Setup wizard** (`/setup`) - Configure your agent
  - Choose AI model (Claude, GPT-4o, Gemini, Kimi)
  - Select exchanges (Binance, Kraken, Raydium, Jupiter, etc.)
  - Connect Telegram bot
  - Save config file

---

## How It Works

### Step 1: Visit Website
User goes to https://agentbear.vercel.app/setup

### Step 2: Configure Agent
- Select language (English, 中文, 한국어, 日本語, Español)
- Enter name & agent name
- Choose preferred AI model
- Select exchanges & add API credentials
- Connect Telegram bot token

### Step 3: Download Config
Setup wizard generates `config.yaml` file

### Step 4: Run Agent
User downloads [agentbear-agent](https://github.com/jpmoregain-eth/agentbear-agent)
```bash
python backend/telegram_bot.py
```

Agent starts listening on Telegram!

---

## Tech Stack

- **Framework:** Next.js 14 + React 18
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (auto-deploy from `main`)
- **No backend required** - Pure frontend, config saved locally

---

## Development

### Local Setup

```bash
git clone https://github.com/jpmoregain-eth/agentbear.git
cd agentbear

npm install
npm run dev
```

Visit http://localhost:3000

### Project Structure

```
agentbear/
├── app/
│   ├── page.jsx              (Landing page)
│   ├── setup/
│   │   └── page.jsx          (Setup wizard - all 5 steps)
│   ├── layout.jsx            (Root layout)
│   └── globals.css
├── public/
│   └── images/               (Bear graphics)
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

### Key Features

- ✅ **Multi-language** - 5 languages supported
- ✅ **Dark theme** - Modern UI
- ✅ **Responsive** - Mobile friendly
- ✅ **No backend** - Fully static site
- ✅ **Step-by-step** - 5-step wizard flow

---

## Deployment

Hosted on **Vercel** with auto-deploy:

1. Push to `main` branch
2. Vercel automatically deploys
3. Live at https://agentbear.vercel.app

---

## For the Agent Backend

To run the actual crypto agent:

👉 **Visit [agentbear-agent](https://github.com/jpmoregain-eth/agentbear-agent)**

- Python backend with CCXT, Telegram, Claude/GPT-4o integration
- Market data fetching & opportunity detection
- Risk assessment & analysis
- Full development roadmap

---

## Links

- **Website:** https://agentbear.vercel.app
- **Agent Backend:** https://github.com/jpmoregain-eth/agentbear-agent
- **Landing Page:** https://agentbear.vercel.app
- **Setup Wizard:** https://agentbear.vercel.app/setup

---

## License

MIT - Feel free to fork, modify, and deploy.

---

🐻 **AgentBear** - Where AI agents find opportunities.
