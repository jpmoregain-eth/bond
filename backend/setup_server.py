from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from memory import AgentMemory
import subprocess
import os
import json

app = Flask(__name__)
CORS(app)

config = Config()
memory = AgentMemory()

# ==================== Setup Endpoints ====================

@app.route('/api/setup/init', methods=['GET'])
def setup_init():
    """Check if this is first time setup or reconfigure."""
    if config.is_configured():
        return jsonify({
            "mode": "reconfigure",
            "user_name": config.get("user_name"),
            "agent_name": config.get("agent_name"),
            "model": config.get("model"),
            "exchanges": list(config.get("exchanges", {}).keys())
        })
    else:
        return jsonify({"mode": "setup"})

@app.route('/api/setup/save', methods=['POST'])
def save_setup():
    """Save setup configuration."""
    data = request.json
    
    try:
        # Save basic config
        config.set("language", data.get("language", "en"))
        config.set("user_name", data.get("user_name"))
        config.set("agent_name", data.get("agent_name"))
        
        # Save model configuration
        config.set("model.primary", data.get("primary_model", "claude"))
        config.set("model.fallback", data.get("fallback_model", "gpt4o"))
        
        # Save model API keys
        if data.get("claude_api_key"):
            config.set("model_keys.claude_api_key", data.get("claude_api_key"))
        if data.get("openai_api_key"):
            config.set("model_keys.openai_api_key", data.get("openai_api_key"))
        if data.get("google_api_key"):
            config.set("model_keys.google_api_key", data.get("google_api_key"))
        if data.get("kimi_api_key"):
            config.set("model_keys.kimi_api_key", data.get("kimi_api_key"))
        
        # Save CEX configuration
        if data.get("binance_enabled"):
            config.set("exchanges.cex.binance.enabled", True)
            config.set("exchanges.cex.binance.api_key", data.get("binance_key", ""))
            config.set("exchanges.cex.binance.api_secret", data.get("binance_secret", ""))
        
        if data.get("kraken_enabled"):
            config.set("exchanges.cex.kraken.enabled", True)
            config.set("exchanges.cex.kraken.api_key", data.get("kraken_key", ""))
            config.set("exchanges.cex.kraken.api_secret", data.get("kraken_secret", ""))
        
        # Save DEX configuration (Ethereum)
        if data.get("uniswap_v3_enabled"):
            config.set("exchanges.dex.ethereum.uniswap_v3.enabled", True)
        
        if data.get("one_inch_enabled"):
            config.set("exchanges.dex.ethereum.one_inch.enabled", True)
        
        # Save DEX configuration (Solana)
        if data.get("raydium_enabled"):
            config.set("exchanges.dex.solana.raydium.enabled", True)
        
        if data.get("jupiter_enabled"):
            config.set("exchanges.dex.solana.jupiter.enabled", True)
        
        # Save Telegram config
        if data.get("telegram_token"):
            config.set("messaging.type", "telegram")
            config.set("messaging.bot_token", data.get("telegram_token"))
        
        config.save()
        
        return jsonify({
            "status": "success",
            "message": "Configuration saved",
            "agent_name": data.get("agent_name")
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

# ==================== Validation Endpoints ====================

@app.route('/api/validate/anthropic', methods=['POST'])
def validate_anthropic():
    """Validate Anthropic API key."""
    data = request.json
    api_key = data.get("api_key")
    
    if config.validate_anthropic(api_key):
        return jsonify({"valid": True})
    else:
        return jsonify({"valid": False}), 400

@app.route('/api/validate/binance', methods=['POST'])
def validate_binance():
    """Validate Binance credentials."""
    data = request.json
    api_key = data.get("api_key")
    api_secret = data.get("api_secret")
    
    if config.validate_binance(api_key, api_secret):
        return jsonify({"valid": True})
    else:
        return jsonify({"valid": False}), 400

@app.route('/api/validate/telegram', methods=['POST'])
def validate_telegram():
    """Validate Telegram bot token."""
    data = request.json
    bot_token = data.get("bot_token")
    
    if config.validate_telegram(bot_token):
        return jsonify({"valid": True})
    else:
        return jsonify({"valid": False}), 400

# ==================== Agent Status Endpoints ====================

@app.route('/api/agent/status', methods=['GET'])
def agent_status():
    """Get agent status."""
    return jsonify({
        "configured": config.is_configured(),
        "user_name": config.get("user_name"),
        "agent_name": config.get("agent_name"),
        "model": config.get("model"),
        "memory": {
            "conversations": len(memory.get_recent_conversations(999)),
            "opportunities_24h": memory.get_opportunity_count(24)
        }
    })

@app.route('/api/agent/start', methods=['POST'])
def start_agent():
    """Start the Telegram bot agent."""
    try:
        if not config.is_configured():
            return jsonify({"status": "error", "message": "Agent not configured"}), 400
        
        # Start bot in background
        # In production, use proper process management
        subprocess.Popen(["python", "telegram_bot.py"])
        
        return jsonify({
            "status": "success",
            "message": "Agent started",
            "agent": config.get("agent_name")
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

# ==================== Test Endpoint ====================

@app.route('/api/test', methods=['GET'])
def test():
    """Test endpoint."""
    return jsonify({
        "status": "online",
        "version": "0.1.0",
        "bond": "Agent Platform"
    })

# ==================== Health Check ====================

@app.route('/health', methods=['GET'])
def health():
    """Health check."""
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    print("🚀 Bond Setup Server starting on http://localhost:5000")
    print("📝 Go to http://localhost:5000 to run setup wizard")
    app.run(debug=True, port=5000)
