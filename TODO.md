# AgentBear Crypto Agent - TODO List

## Phase 1: Agent Logic (MVP - Week 1-2)

### Market Data Integration
- [ ] Implement CCXT integration for CEX data
  - [ ] Binance price fetching
  - [ ] Kraken price fetching
  - [ ] Handle rate limiting
  - [ ] Error handling for API failures

- [ ] Implement DEX data fetching
  - [ ] Raydium (Solana) via Jupiter API
  - [ ] Jupiter aggregator pricing
  - [ ] Uniswap V3 (Ethereum) via RPC
  - [ ] 1inch (Ethereum) aggregator
  - [ ] Cache prices to reduce API calls

### Opportunity Detection Engine
- [ ] Arbitrage detection
  - [ ] Cross-CEX arbitrage (Binance vs Kraken)
  - [ ] CEX vs DEX arbitrage
  - [ ] Multi-chain arbitrage (ETH vs SOL)

- [ ] Inefficiency detection
  - [ ] Stale prices on smaller exchanges
  - [ ] Liquidity gaps
  - [ ] Volume-based anomalies

- [ ] Opportunity filtering
  - [ ] Minimum profit threshold (e.g., 1% before fees)
  - [ ] Minimum liquidity requirement
  - [ ] Exclude low-volume pairs

### Risk Assessment Module
- [ ] Slippage calculator
  - [ ] Based on order size vs liquidity
  - [ ] Uniswap/Raydium specific formulas

- [ ] Fee calculation
  - [ ] Exchange trading fees (Binance, Kraken)
  - [ ] Network fees (gas, SOL)
  - [ ] DEX slippage fees

- [ ] Risk scoring
  - [ ] Liquidity risk
  - [ ] Counterparty risk
  - [ ] Execution risk

### Claude Agent Logic
- [ ] Update `crypto_agent.py` to:
  - [ ] Fetch real market data
  - [ ] Detect opportunities
  - [ ] Assess risks
  - [ ] Generate institutional-grade analysis

- [ ] System prompt enhancements
  - [ ] Include market context
  - [ ] Risk disclaimers
  - [ ] Institutional tone

---

## Phase 2: Model Routing (Week 2)

### Multi-Model Support
- [ ] Implement model router in `crypto_agent.py`
  - [ ] Load correct API key based on user choice
  - [ ] Route to correct model endpoint
  - [ ] Handle fallback model logic

- [ ] Add model-specific adapters
  - [ ] Claude (Anthropic) adapter
  - [ ] GPT-4o (OpenAI) adapter
  - [ ] Gemini 2.0 Flash (Google) adapter
  - [ ] Kimi (Moonshot) adapter

- [ ] Error handling
  - [ ] Graceful fallback if primary model fails
  - [ ] Log which model was used
  - [ ] Track model performance/costs

### Model Configuration
- [ ] Update `setup_server.py` to validate API keys
  - [ ] OpenAI API key validation
  - [ ] Google API key validation
  - [ ] Kimi API key validation

- [ ] Store model choice in config
  - [ ] Load correct API key on agent startup
  - [ ] Support switching models without reinstall

---

## Phase 3: Telegram Bot Integration (Week 2-3)

### Bot Command Handlers
- [ ] `/opportunities` - Find trading opportunities
  - [ ] Call crypto agent
  - [ ] Return formatted results
  - [ ] Add keyboard with "Details" button

- [ ] `/analyze [TOKEN]` - Analyze specific token
  - [ ] Fetch token data from multiple exchanges
  - [ ] Risk assessment
  - [ ] Price history

- [ ] `/status` - Agent status
  - [ ] Show configured exchanges
  - [ ] Show model being used
  - [ ] Show memory stats (conversations, patterns)

- [ ] `/monitor [TOKEN]` - Add to watch list
  - [ ] Store in preferences
  - [ ] Send alerts when price moves

- [ ] `/settings` - User preferences
  - [ ] Risk tolerance (low/medium/high)
  - [ ] Min profit threshold
  - [ ] Alert settings

### Message Handling
- [ ] Free-form message processing
  - [ ] User: "Find SOL opportunities"
  - [ ] Agent analyzes and responds
  - [ ] Save to memory

- [ ] Context awareness
  - [ ] Pull recent conversations from memory
  - [ ] Include in Claude context
  - [ ] Remember user preferences

### Telegram Bot Features
- [ ] Inline keyboards for easy interaction
- [ ] Formatted messages with emojis
- [ ] Error messages that don't crash bot
- [ ] Rate limiting (avoid API spam)
- [ ] Logging of all interactions

---

## Phase 4: Platform API Integration (Week 3)

### Agent ↔ Platform Communication
- [ ] Agent calls platform endpoints
  - [ ] GET `/api/models/{model_name}/complete` - Send prompt, get response
  - [ ] POST `/api/tools/market_data` - Fetch exchange prices
  - [ ] POST `/api/logs/add` - Log interactions

- [ ] Platform tools endpoint
  - [ ] Implement `/api/tools/market_data`
  - [ ] Implement `/api/tools/rpc_call`
  - [ ] Implement `/api/tools/web_search`

### Tool System
- [ ] Create tool registry
  - [ ] Define available tools per model
  - [ ] Validate tool compatibility

- [ ] Market data tool
  - [ ] Accept: `{exchange: "binance", symbol: "BTC/USDT"}`
  - [ ] Return: `{price, volume, liquidity}`

- [ ] RPC tool (for Solana/Ethereum)
  - [ ] Accept: `{chain: "solana", method: "getBalance", params: [...]}`
  - [ ] Return: RPC response

---

## Phase 5: Testing & Refinement (Week 3)

### Integration Tests
- [ ] Setup wizard → Config save → Agent startup
- [ ] Telegram bot → User message → Claude response
- [ ] Multi-model: Switch models, verify correct one is used
- [ ] Exchange APIs: Fetch prices, handle failures gracefully

### Performance Testing
- [ ] Market data fetch latency
- [ ] Claude response time (per model)
- [ ] Memory usage (especially SQLite)
- [ ] Telegram message throughput

### Edge Cases
- [ ] Exchange API down → Fallback to other exchanges
- [ ] Model API down → Use fallback model
- [ ] No opportunities found → Return helpful message
- [ ] Invalid user input → Clear error message

### Security Testing
- [ ] API keys not logged
- [ ] Sensitive data not stored in memory
- [ ] Telegram tokens not exposed
- [ ] Rate limiting prevents abuse

---

## Phase 6: CLI Interactive Setup (Headless Servers)

### Headless Installation
- [ ] Detect if running headless (no X11/display)
- [ ] Launch `setup_interactive.py` instead of browser wizard
- [ ] Support all 5 steps via terminal
  - [ ] Language selection
  - [ ] User/agent names
  - [ ] Model selection + API key entry
  - [ ] Exchange selection + credentials
  - [ ] Telegram token

### Terminal UI
- [ ] Color-coded options
- [ ] Clear formatting
- [ ] Progress indication
- [ ] Validation feedback

### Auto-Detection Script
- [ ] `install.sh` detects environment
- [ ] Routes to browser or CLI setup
- [ ] Handles both scenarios

---

## Phase 7: Documentation

### README Updates
- [ ] Add "Supported Models" section
- [ ] Add "Supported Exchanges" section
- [ ] Add "How to get API keys" for each model
- [ ] Add "Security" section (data locality, key management)

### Setup Guide
- [ ] Step-by-step: Browser wizard
- [ ] Step-by-step: CLI wizard
- [ ] Troubleshooting common issues
- [ ] Model comparison table

### API Documentation
- [ ] Platform API endpoints
- [ ] Tool registry format
- [ ] Agent config schema
- [ ] Memory structure

---

## Phase 8: Future Enhancements (Post-MVP)

### Multi-Language Agent Responses
- [ ] Load language from config
- [ ] Pass to Claude in system prompt
- [ ] Translate opportunities to user's language

### Extended Exchanges
- [ ] Bybit (CEX)
- [ ] More DEXes (Curve, Balancer, etc.)
- [ ] More blockchains (Polygon, Arbitrum, etc.)

### Advanced Features
- [ ] Automated trading (dry-run first)
- [ ] Price alerts
- [ ] Pattern detection
- [ ] Strategy backtesting

### Monitoring & Analytics
- [ ] Dashboard: Opportunities found per day
- [ ] Analytics: Model performance comparison
- [ ] Alerts: Agent health checks
- [ ] Logs: Searchable history

---

## Known Issues / Blockers

- [ ] CCXT connection failures need graceful fallback
- [ ] DEX RPC calls can be slow (need caching)
- [ ] Telegram rate limiting not yet implemented
- [ ] Model fallback logic not tested with real API failures

---

## Dependencies to Install

```bash
# Python packages
pip install anthropic openai google-generativeai
pip install ccxt
pip install solana
pip install python-telegram-bot
pip install requests
```

---

## Notes

- **Market data priority:** Binance → Raydium → Jupiter (covers 80% of crypto liquidity)
- **Model recommendation:** Default to Claude, fallback to GPT-4o
- **Risk assessment:** Always calculate slippage before suggesting trades
- **Memory optimization:** Keep only last 30 days of conversations
