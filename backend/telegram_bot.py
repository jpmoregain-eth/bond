from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from config import Config
from memory import AgentMemory
from crypto_agent import CryptoAgent
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BondTelegramBot:
    """Telegram bot interface for Bond agents."""
    
    def __init__(self, config: Config, memory: AgentMemory, agent: CryptoAgent):
        self.config = config
        self.memory = memory
        self.agent = agent
        self.user_language = config.get("language", "en")
    
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /start command."""
        user_name = self.config.get("user_name")
        agent_name = self.config.get("agent_name")
        
        welcome = f"""
Hello {user_name}! 👋

I'm {agent_name}, your crypto market analyst.

I can help you:
• Find trading opportunities
• Analyze tokens
• Monitor market conditions
• Assess risks

Try asking:
"Find opportunities"
"Analyze SOL"
"What's happening on Raydium?"
"""
        await update.message.reply_text(welcome)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /help command."""
        help_text = """
Available commands:
/start - Start chatting
/opportunities - Find trading opportunities
/analyze [TOKEN] - Analyze a token
/status - Check agent status
/help - Show this message
"""
        await update.message.reply_text(help_text)
    
    async def opportunities(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /opportunities command."""
        await update.message.reply_text("🔍 Scanning markets... (this is a demo, would call real data)")
        response = self.agent.find_opportunities(self.user_language)
        await update.message.reply_text(response)
    
    async def status(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /status command."""
        convo_count = len(self.memory.get_recent_conversations(999))
        opp_count = self.memory.get_opportunity_count(24)
        
        status_text = f"""
✅ Status: Online

Agent: {self.config.get('agent_name')}
Model: {self.config.get('model')}
Language: {self.user_language}

Memory:
- Conversations: {convo_count}
- Opportunities (24h): {opp_count}
"""
        await update.message.reply_text(status_text)
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle regular messages."""
        user_input = update.message.text
        
        # Show typing indicator
        await update.message.chat.send_action("typing")
        
        # Get agent response
        response = self.agent.analyze_market(user_input, self.user_language)
        await update.message.reply_text(response)
    
    async def run(self):
        """Start the bot."""
        token = self.config.get("telegram.bot_token")
        if not token:
            logger.error("Telegram bot token not configured")
            return
        
        # Create application
        application = Application.builder().token(token).build()
        
        # Add handlers
        application.add_handler(CommandHandler("start", self.start))
        application.add_handler(CommandHandler("help", self.help_command))
        application.add_handler(CommandHandler("opportunities", self.opportunities))
        application.add_handler(CommandHandler("status", self.status))
        application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
        
        # Run
        logger.info("🤖 Bond Telegram Bot started")
        await application.run_polling()

# Usage
async def start_bot():
    config = Config()
    memory = AgentMemory()
    agent = CryptoAgent(config, memory)
    bot = BondTelegramBot(config, memory, agent)
    await bot.run()

if __name__ == "__main__":
    import asyncio
    asyncio.run(start_bot())
