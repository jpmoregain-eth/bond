import yaml
from pathlib import Path
from typing import Dict, Any

class Config:
    """Configuration manager for Bond agents."""
    
    DEFAULT_CONFIG = {
        "language": "en",
        "user_name": "",
        "agent_name": "",
        "model": "claude",
        "model_api_key": "",
        "exchanges": {
            "binance": {
                "enabled": False,
                "api_key": "",
                "api_secret": ""
            },
            "raydium": {
                "enabled": True,
                "rpc_url": "https://api.mainnet-beta.solana.com"
            }
        },
        "telegram": {
            "bot_token": "",
            "enabled": False
        },
        "monitoring": {
            "enabled": False,
            "update_interval": 300,  # 5 minutes
            "tokens": []
        }
    }
    
    def __init__(self, config_path: str = "bond_config.yaml"):
        self.config_path = Path(config_path)
        self.config = self.load()
    
    def load(self) -> Dict[str, Any]:
        """Load config from file or return defaults."""
        if self.config_path.exists():
            with open(self.config_path, 'r') as f:
                loaded = yaml.safe_load(f)
                # Merge with defaults
                return {**self.DEFAULT_CONFIG, **loaded}
        return self.DEFAULT_CONFIG.copy()
    
    def save(self):
        """Save config to file."""
        with open(self.config_path, 'w') as f:
            yaml.dump(self.config, f, default_flow_style=False)
    
    def get(self, key: str, default=None):
        """Get config value by dot notation (e.g., 'exchanges.binance.api_key')."""
        keys = key.split('.')
        value = self.config
        for k in keys:
            if isinstance(value, dict):
                value = value.get(k)
            else:
                return default
        return value if value is not None else default
    
    def set(self, key: str, value: Any):
        """Set config value by dot notation."""
        keys = key.split('.')
        config = self.config
        for k in keys[:-1]:
            if k not in config:
                config[k] = {}
            config = config[k]
        config[keys[-1]] = value
    
    def is_configured(self) -> bool:
        """Check if agent is fully configured."""
        return (
            self.config.get("user_name") and
            self.config.get("agent_name") and
            self.config.get("model_api_key") and
            self.config.get("telegram", {}).get("bot_token")
        )
    
    def validate_binance(self, api_key: str, api_secret: str) -> bool:
        """Validate Binance credentials."""
        try:
            import ccxt
            exchange = ccxt.binance({'apiKey': api_key, 'secret': api_secret})
            exchange.fetch_balance()
            return True
        except:
            return False
    
    def validate_telegram(self, bot_token: str) -> bool:
        """Validate Telegram bot token."""
        try:
            import requests
            response = requests.get(f"https://api.telegram.org/bot{bot_token}/getMe")
            return response.status_code == 200
        except:
            return False
    
    def validate_anthropic(self, api_key: str) -> bool:
        """Validate Anthropic API key."""
        try:
            from anthropic import Anthropic
            client = Anthropic(api_key=api_key)
            client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=10,
                messages=[{"role": "user", "content": "test"}]
            )
            return True
        except:
            return False
