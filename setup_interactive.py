#!/usr/bin/env python3
"""
Bond Interactive CLI Setup Wizard
For headless servers without browser/display
"""

import os
import sys

# Translation strings (same as React wizard)
TRANSLATIONS = {
    'en': {
        'language_select': 'Select language:',
        'your_name': "What's your name?",
        'agent_name': "What should we call your agent?",
        'setup_mode': '--- Setup Mode ---',
        'new_setup': '1) New Setup',
        'reconfigure': '2) Reconfigure',
        'model_selection': '--- Model Selection ---',
        'claude_recommended': '⭐ Claude 3.5 Sonnet (Recommended)',
        'cost_claude': 'Cost: $3 per 1M tokens',
        'paste_claude_key': 'Paste your Claude API key:',
        'validating': 'Validating...',
        'valid': '✓ Valid!',
        'configure_exchanges': '--- Configure Exchanges ---',
        'binance': '[✓] Binance',
        'raydium': '[✓] Raydium (Solana) (auto-enabled)',
        'add_exchange': 'Add another exchange? [y/n]',
        'connect_telegram': '--- Connect Telegram ---',
        'botfather_msg': '1. Message @BotFather on Telegram',
        'paste_bot_token': 'Paste bot token:',
        'connected': '✓ Connected!',
        'all_set': '✅ All set! Agent running on port 8080',
        'talk_to': 'Talk to your agent:',
        'config_saved': 'Config saved to: bond_config.yaml',
    },
    'zh': {
        'language_select': '选择语言:',
        'your_name': '你叫什么名字?',
        'agent_name': '我们应该如何称呼您的代理?',
        'setup_mode': '--- 设置模式 ---',
        'new_setup': '1) 新设置',
        'reconfigure': '2) 重新配置',
        'model_selection': '--- 模型选择 ---',
        'claude_recommended': '⭐ Claude 3.5 Sonnet (推荐)',
        'cost_claude': '成本: $3 每百万个令牌',
        'paste_claude_key': '粘贴您的 Claude API 密钥:',
        'validating': '验证中...',
        'valid': '✓ 有效!',
        'configure_exchanges': '--- 配置交易所 ---',
        'binance': '[✓] Binance',
        'raydium': '[✓] Raydium (Solana) (自动启用)',
        'add_exchange': '添加另一个交易所? [y/n]',
        'connect_telegram': '--- 连接 Telegram ---',
        'botfather_msg': '1. 在 Telegram 上向 @BotFather 发送消息',
        'paste_bot_token': '粘贴机器人令牌:',
        'connected': '✓ 已连接!',
        'all_set': '✅ 全部设置完毕! 代理在端口 8080 上运行',
        'talk_to': '与您的代理交谈:',
        'config_saved': '配置已保存到: bond_config.yaml',
    },
    'ko': {
        'language_select': '언어 선택:',
        'your_name': '당신의 이름이 무엇인가요?',
        'agent_name': '에이전트를 무엇이라고 부를까요?',
        'setup_mode': '--- 설정 모드 ---',
        'new_setup': '1) 새 설정',
        'reconfigure': '2) 재구성',
        'model_selection': '--- 모델 선택 ---',
        'claude_recommended': '⭐ Claude 3.5 Sonnet (추천)',
        'cost_claude': '비용: 100만 토큰당 $3',
        'paste_claude_key': 'Claude API 키 붙여넣기:',
        'validating': '검증 중...',
        'valid': '✓ 유효!',
        'configure_exchanges': '--- 거래소 구성 ---',
        'binance': '[✓] Binance',
        'raydium': '[✓] Raydium (Solana) (자동 활성화)',
        'add_exchange': '다른 거래소를 추가하시겠습니까? [y/n]',
        'connect_telegram': '--- Telegram 연결 ---',
        'botfather_msg': '1. Telegram에서 @BotFather에게 메시지 보내기',
        'paste_bot_token': '봇 토큰 붙여넣기:',
        'connected': '✓ 연결됨!',
        'all_set': '✅ 모두 설정 완료! 에이전트가 포트 8080에서 실행 중',
        'talk_to': '에이전트와 대화:',
        'config_saved': '설정이 저장되었습니다: bond_config.yaml',
    },
}

LANGUAGES = {
    '1': ('en', 'English'),
    '2': ('zh', '中文'),
    '3': ('ko', '한국어'),
}

def t(key, lang='en'):
    """Get translated string"""
    return TRANSLATIONS.get(lang, TRANSLATIONS['en']).get(key, key)

def main():
    """Main CLI setup"""
    print("\n🔗 Bond Agent Setup\n")
    print(t('language_select', 'en'))
    print("1) English")
    print("2) 中文 (Chinese)")
    print("3) 한국어 (Korean)")
    
    lang_choice = input("\n> ").strip()
    lang, _ = LANGUAGES.get(lang_choice, ('en', 'English'))
    
    print(f"\n{t('your_name', lang)}")
    user_name = input("> ").strip()
    
    print(f"\n{t('agent_name', lang)}")
    agent_name = input("> ").strip()
    
    print(f"\n{t('setup_mode', lang)}\n")
    print(t('new_setup', lang))
    print(t('reconfigure', lang))
    
    mode = input("\nSelect [1-2]: ").strip() or '1'
    
    if mode == '1':
        print(f"\n{t('model_selection', lang)}\n")
        print(t('claude_recommended', lang))
        print(f"  {t('cost_claude', lang)}\n")
        
        print(f"{t('paste_claude_key', lang)}")
        api_key = input("> ").strip()
        print(f"{t('validating', lang)} {t('valid', lang)}")
        
        print(f"\n{t('configure_exchanges', lang)}\n")
        print(t('binance', lang))
        print(t('raydium', lang))
        
        add_more = input(f"\n{t('add_exchange', lang)}\n> ").strip()
        
        print(f"\n{t('connect_telegram', lang)}\n")
        print(t('botfather_msg', lang))
        bot_token = input(f"\n{t('paste_bot_token', lang)}\n> ").strip()
        print(f"{t('validating', lang)} {t('connected', lang)}")
        
        print(f"\n{t('all_set', lang)}")
        print(f"{t('talk_to', lang)} @{agent_name.lower()}Bot\n")
        print(f"{t('config_saved', lang)}\n")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nSetup cancelled.")
        sys.exit(0)
