# Bond Backend - v0.1

Setup wizard + crypto agent MVP for Bond.

## Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run Setup Server

```bash
python setup_server.py
```

The setup wizard will open at `http://localhost:5000/setup`

### 3. Configure Your Agent

1. Select language (English, Chinese, Korean, Japanese, Spanish)
2. Enter your name and agent name
3. Choose model (Claude Sonnet recommended)
4. Connect exchanges (Binance optional, Raydium auto-enabled)
5. Connect Telegram bot

### 4. Start Agent

Once configured, your agent will:
- Listen on Telegram for commands
- Analyze crypto markets
- Find trading opportunities
- Remember conversations

## Components

### `setup_server.py`
Flask backend for the setup wizard. Handles:
- Config saving
- API validation (Anthropic, Binance, Telegram)
- Agent lifecycle management

### `crypto_agent.py`
The actual agent. Provides:
- Market analysis with Claude
- Opportunity detection
- Multi-language support
- Memory integration

### `telegram_bot.py`
Telegram interface. Commands:
- `/start` - Begin
- `/opportunities` - Find trades
- `/analyze [TOKEN]` - Analyze token
- `/status` - Check agent health

### `memory.py`
SQLite-based memory system. Stores:
- Conversations
- Found opportunities
- User preferences
- Market patterns
- Automatic cleanup (30+ days)

### `config.py`
Configuration manager. Validates:
- Anthropic API keys
- Binance credentials
- Telegram bot tokens

## Environment Variables

```bash
ANTHROPIC_API_KEY=sk-ant-...
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
BINANCE_API_KEY=your-key
BINANCE_API_SECRET=your-secret
```

Or use setup wizard to enter interactively.

## File Structure

```
bond/
├── app/                    # Next.js frontend
│   └── setup/             # Wizard UI
├── backend/
│   ├── setup_server.py    # Flask backend
│   ├── crypto_agent.py    # Agent logic
│   ├── telegram_bot.py    # Telegram interface
│   ├── memory.py          # SQLite memory
│   ├── config.py          # Config manager
│   ├── requirements.txt    # Python dependencies
│   └── bond_config.yaml   # Agent config (auto-created)
└── README.md
```

## Next Steps (Phase 2)

- [ ] Add Kraken exchange connector
- [ ] Add liquidation detection
- [ ] Add real opportunity scanning
- [ ] Add web interface dashboard
- [ ] Deploy to cloud

## Development

### Add New Exchange

Edit `crypto_agent.py` and `config.py`:

```python
# config.py
"kraken": {
    "enabled": False,
    "api_key": "",
    "api_secret": ""
}

# crypto_agent.py
def get_kraken_prices(self):
    import ccxt
    exchange = ccxt.kraken({...})
    return exchange.fetch_ticker('BTC/USD')
```

### Add New Command

Edit `telegram_bot.py`:

```python
async def new_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /new_command."""
    response = self.agent.do_something()
    await update.message.reply_text(response)

# In run():
application.add_handler(CommandHandler("new_command", self.new_command))
```

## Testing

```bash
# Test setup server
curl http://localhost:5000/api/test

# Test validation
curl -X POST http://localhost:5000/api/validate/anthropic \
  -H "Content-Type: application/json" \
  -d '{"api_key": "sk-ant-..."}'

# Test agent status
curl http://localhost:5000/api/agent/status
```

## License

MIT - See LICENSE file

---

**Bond** - Where AI agents find opportunities and bond with your strategy.
