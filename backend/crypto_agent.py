from anthropic import Anthropic
from memory import AgentMemory
from config import Config
import json

class CryptoAgent:
    """Bond Crypto Agent - Multi-exchange opportunity detector."""
    
    def __init__(self, config: Config, memory: AgentMemory):
        self.config = config
        self.memory = memory
        self.client = Anthropic(api_key=config.get("model_api_key"))
        self.model = "claude-3-5-sonnet-20241022"
    
    def analyze_market(self, user_input: str, language: str = "en") -> str:
        """Analyze user query and return insights."""
        
        # Build context from memory
        recent_convos = self.memory.get_recent_conversations(5)
        recent_opps = self.memory.get_opportunity_count(24)
        
        context = f"""
You are {self.config.get('agent_name')}, a professional crypto market analyst.
You are speaking to {self.config.get('user_name')}.
Respond in {self._language_name(language)}.

Recent activity:
- Opportunities found today: {recent_opps}
- Recent conversations: {len(recent_convos)}

Your task: Analyze the user's query and provide institutional-grade insights.
If they ask for opportunities, explain potential trades across Binance and Raydium.
Always assess risk (slippage, liquidity, fees).
Use Claude reasoning to explain your analysis.
"""
        
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[
                    {
                        "role": "user",
                        "content": context + f"\n\nUser: {user_input}"
                    }
                ]
            )
            
            agent_response = response.content[0].text
            
            # Save to memory
            self.memory.save_conversation(user_input, agent_response, language)
            
            return agent_response
        
        except Exception as e:
            return f"Error analyzing market: {str(e)}"
    
    def find_opportunities(self, language: str = "en") -> str:
        """Scan for trading opportunities."""
        
        prompt = f"""
Analyze current crypto market conditions and suggest trading opportunities.
Focus on: Binance (CEX) vs Raydium (DEX Solana).

For each opportunity provide:
1. Type (arbitrage, inefficiency, etc.)
2. Tokens/pairs involved
3. Buy/sell price and venue
4. Profit percentage (before fees)
5. Risk level

Response format:
- Opportunity 1: [name]
  * Details...
- Opportunity 2: [name]
  * Details...

Respond in {self._language_name(language)}.
"""
        
        return self.analyze_market(prompt, language)
    
    def analyze_token(self, token: str, language: str = "en") -> str:
        """Analyze specific token."""
        return self.analyze_market(f"Analyze {token}. Show me price across major exchanges and any opportunities.", language)
    
    def _language_name(self, lang_code: str) -> str:
        """Convert language code to name."""
        names = {
            "en": "English",
            "zh": "Simplified Chinese",
            "ko": "Korean",
            "ja": "Japanese",
            "es": "Spanish"
        }
        return names.get(lang_code, "English")

# Example usage
if __name__ == "__main__":
    config = Config()
    memory = AgentMemory()
    agent = CryptoAgent(config, memory)
    
    # Test
    if config.is_configured():
        print(agent.find_opportunities("en"))
    else:
        print("Agent not configured. Run setup wizard first.")
