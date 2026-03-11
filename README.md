# AgentBear - Open Source AI Agent Platform

🐻 Where AI agents find opportunities.

## What is AgentBear?

AgentBear is an open-source AI agent platform that makes autonomous AI agents accessible to everyone. Download, install, pick an agent type, and start working with Claude or GPT via Telegram.

**Phase 1:** Crypto trading agent (multi-exchange, multi-chain analysis)
**Phase 2:** Research agent (news synthesis, topic monitoring)
**Phase 3:** Community platform (modular agents, user-built extensions)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/jpmoregain-eth/agentbear.git
cd agentbear

# Install dependencies
pip install -r requirements.txt

# Configure your agent
cp config.yaml.example config.yaml
# Edit config.yaml with your API keys

# Run the agent
python agent.py
```

## Agents

### Crypto Agent (MVP)
- Real-time market analysis across CEX and DEX
- Opportunity detection (arbitrage, inefficiencies)
- Risk assessment and slippage estimation
- Multi-chain support (Solana, Ethereum, BSC, etc.)
- Telegram interface

**Supported Exchanges:**
- CEX: Binance, Kraken, Bybit
- DEX: Uniswap, Raydium, Jupiter, PancakeSwap, Curve

## Architecture

```
Platform (Model Router + Tools + Logging)
  ├── Crypto Agent
  ├── Research Agent (coming Phase 2)
  └── Custom Agents (community-driven)
```

Agents are lightweight clients. Platform handles:
- Model routing (Claude/GPT)
- Tool provision (web search, market data, APIs)
- Logging and observability

## Roadmap

- **Month 1:** Crypto agent MVP
- **Month 2-3:** Validation with real users
- **Month 4-5:** Add research + other agents
- **Month 6-7:** Decouple to server/client model
- **Month 8+:** Community platform + agent marketplace

## Tech Stack

- **Language:** Python 3.10+
- **Messaging:** Telegram API
- **Models:** Claude (Anthropic)
- **Infrastructure:** Self-hosted or cloud

## Contributing

This is early stage. Contributions welcome:
- New exchange connectors
- New agent types
- Improved analysis logic
- Documentation

## Security

- No private keys stored
- Data stays local by default
- API keys managed securely
- Open for audit

## License

MIT - Feel free to fork, modify, deploy however you want.

---

**AgentBear** - 🐻 Open source AI agents finding opportunities.
