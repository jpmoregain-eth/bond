import sqlite3
import json
from datetime import datetime
from pathlib import Path

class AgentMemory:
    """SQLite-based memory system for Bond agents."""
    
    def __init__(self, db_path: str = "bond_agent.db"):
        self.db_path = db_path
        self.init_db()
    
    def init_db(self):
        """Initialize database tables."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Conversations table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_message TEXT,
                agent_response TEXT,
                language TEXT,
                context TEXT
            )
        ''')
        
        # Opportunities table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS opportunities (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                type TEXT,
                exchange_pair TEXT,
                profit_pct REAL,
                was_executed BOOLEAN DEFAULT 0,
                actual_profit REAL
            )
        ''')
        
        # User preferences
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS preferences (
                key TEXT PRIMARY KEY,
                value TEXT
            )
        ''')
        
        # Market patterns
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS patterns (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pattern_name TEXT,
                frequency TEXT,
                last_seen DATETIME,
                confidence REAL
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def save_conversation(self, user_message: str, agent_response: str, language: str = "en"):
        """Save conversation to memory."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO conversations (user_message, agent_response, language)
            VALUES (?, ?, ?)
        ''', (user_message, agent_response, language))
        
        conn.commit()
        conn.close()
    
    def save_opportunity(self, opp_type: str, exchange_pair: str, profit_pct: float):
        """Save found opportunity."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO opportunities (type, exchange_pair, profit_pct)
            VALUES (?, ?, ?)
        ''', (opp_type, exchange_pair, profit_pct))
        
        conn.commit()
        conn.close()
    
    def get_recent_conversations(self, limit: int = 10):
        """Get recent conversations."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT user_message, agent_response, timestamp
            FROM conversations
            ORDER BY timestamp DESC
            LIMIT ?
        ''', (limit,))
        
        results = cursor.fetchall()
        conn.close()
        return results
    
    def get_opportunity_count(self, hours: int = 24):
        """Get opportunities found in last N hours."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT COUNT(*) FROM opportunities
            WHERE timestamp >= datetime('now', '-' || ? || ' hours')
        ''', (hours,))
        
        count = cursor.fetchone()[0]
        conn.close()
        return count
    
    def set_preference(self, key: str, value):
        """Set user preference."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO preferences (key, value)
            VALUES (?, ?)
        ''', (key, json.dumps(value)))
        
        conn.commit()
        conn.close()
    
    def get_preference(self, key: str):
        """Get user preference."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('SELECT value FROM preferences WHERE key = ?', (key,))
        result = cursor.fetchone()
        conn.close()
        
        if result:
            return json.loads(result[0])
        return None
    
    def cleanup(self):
        """Clean up old data (30+ days)."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Delete old conversations
        cursor.execute('''
            DELETE FROM conversations
            WHERE timestamp < datetime('now', '-30 days')
        ''')
        
        # Delete old opportunities
        cursor.execute('''
            DELETE FROM opportunities
            WHERE timestamp < datetime('now', '-7 days')
        ''')
        
        conn.commit()
        conn.close()
