'use client';

import { useState } from 'react';
import Image from 'next/image';

const translations = {
  en: {
    title: 'Agent Bear Corps Setup Wizard',
    subtitle: 'Configure your Agent in 5 minutes',
    subtitleReconfigure: 'Add new agents and APIs to your existing setup',
    newSetup: 'New Setup',
    reconfigure: 'Reconfigure',
    welcome: 'Welcome to Agent Bear Corps',
    welcomeBack: 'Welcome back, {name}! 👋',
    welcomeDesc: 'This wizard will guide you through setting up your agent in just a few minutes.',
    youllNeed: "You'll need:",
    apiKey: 'API key from Claude (Anthropic)',
    binanceOptional: 'Binance API credentials (optional)',
    telegramToken: 'Telegram bot token',
    whatIsYourName: "What's your name?",
    namePlaceholder: 'e.g., Derek',
    whatIsAgentName: "What should we call your agent?",
    agentNamePlaceholder: 'e.g., Sentinel, Oracle, Ghost',
    chooseModel: 'Choose Your Model',
    claudeSonnet: 'Claude 3.5 Sonnet',
    recommended: '⭐ Recommended',
    cost: 'Cost: $3 per 1M tokens',
    speed: 'Speed: 3-5 seconds',
    toolSupport: 'Tool Support: ✓ Full',
    reasoning: 'Reasoning: ✓ Excellent',
    getApiKey: 'Get API Key',
    gpt4o: 'GPT-4o',
    alternative: 'Alternative',
    costGpt: 'Cost: $5 per 1M tokens',
    speedGpt: 'Speed: 2-4 seconds',
    configureExchanges: 'Configure Exchanges',
    binance: 'Binance',
    apiKeyLabel: 'API Key',
    apiSecretLabel: 'API Secret',
    validate: 'Validate',
    getKeys: 'Get Keys',
    credentialsValid: 'Credentials valid!',
    raydium: 'Raydium (Solana)',
    autoEnabled: 'Auto-enabled',
    noAuthRequired: 'No authentication required - public RPC',
    connectTelegram: 'Connect Telegram',
    createBot: '1. Create a Telegram Bot',
    openBotFather: 'Open @BotFather',
    pasteBotToken: '2. Paste Your Bot Token',
    enterTelegramToken: 'Enter your Telegram bot token',
    connected: 'Connected!',
    agentListening: 'Your agent is listening on Telegram',
    youreAllSet: "You're All Set!",
    agentReady: 'Your Agent Bear Corps agent is ready to work for you',
    whatsNext: "What's next:",
    agentRunning: 'Agent is running on port 8080',
    chatBot: 'Chat with your bot on Telegram (@YourAgentBot)',
    tryCommands: 'Try: "Help" or "What can you do?"',
    launchAgent: 'Launch Agent',
    viewDocs: 'View Docs',
    back: 'Back',
    next: 'Next',
    currentConfig: 'Current Configuration:',
    model: 'Model',
    exchanges: 'Exchanges',
    telegram: 'Telegram',
    whatWouldYouLikeToDo: 'What would you like to do?',
    addExchange: 'Add another exchange',
    addExchangeDesc: 'Connect Kraken, Bybit, or other CEX/DEX',
    addModel: 'Add backup model',
    addModelDesc: 'Set GPT-4o as fallback if Claude unavailable',
    addMonitoring: 'Add monitoring tools',
    addMonitoringDesc: 'Enable alerts for specific tokens or pairs',
    viewStats: 'View agent statistics',
    viewStatsDesc: 'Check memory, patterns found, uptime',
    configUpdated: 'Configuration Updated!',
    restartMessage: 'Your agent will restart in 30 seconds with the new settings',
    preserved: "What's been preserved:",
    conversations: 'All conversations (156 saved)',
    patterns: 'Market patterns (4 detected)',
    preferences: 'User preferences',
    history: 'Opportunity history',
    gotIt: 'Got It!',
  }
};

export default function SetupWizard() {
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [agentName, setAgentName] = useState('');
  const [config, setConfig] = useState({
    model: 'claude',
    binanceKey: '',
    binanceSecret: '',
    telegramToken: '',
  });

  const [validated, setValidated] = useState({
    model: true,
    binance: false,
    telegram: false,
  });

  const t = translations[language];

  const setupSteps = [
    { number: 1, title: t.welcome, description: 'Name & Agent' },
    { number: 2, title: t.chooseModel, description: 'Model' },
    { number: 3, title: t.configureExchanges, description: 'Exchanges' },
    { number: 4, title: t.connectTelegram, description: 'Telegram' },
    { number: 5, title: t.youreAllSet, description: 'Complete' },
  ];

  const handleModeSelect = (newMode) => {
    setMode(newMode);
    setStep(1);
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Language selection screen
  if (!mode) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        {/* Background */}
        <div className="fixed inset-0 bg-mesh opacity-60 pointer-events-none" />
        
        {/* Nav */}
        <nav className="relative z-10 border-b border-white/10 py-4">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
            <a href="/" className="flex items-center gap-3 group">
              <img src="/images/agentbearcorps-logo.png" alt="Agent Bear Corps" className="w-10 h-10 rounded-lg animate-float object-cover" />
              <span className="text-xl font-bold text-white">Agent Bear Corps</span>
            </a>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 bg-[#12121a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="en">English</option>
            </select>
          </div>
        </nav>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 
              rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-indigo-400 font-medium text-sm">Setup Wizard</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-xl text-slate-400">{t.subtitle}</p>
          </div>

          <div className="space-y-8">
            {/* Bear mascot */}
            <div className="flex justify-center mb-8">
              <img src="/images/agent-wizard.png" alt="Setup Bear" className="w-32 h-32 object-cover rounded-2xl" />
            </div>

            {/* Name Input */}
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8">
              <label className="block text-lg font-bold text-white mb-4">{t.whatIsYourName}</label>
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-4 bg-[#0a0a0f] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-lg placeholder:text-slate-600"
              />
            </div>

            {/* Agent Name Input */}
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8">
              <label className="block text-lg font-bold text-white mb-4">{t.whatIsAgentName}</label>
              <input
                type="text"
                placeholder={t.agentNamePlaceholder}
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full px-4 py-4 bg-[#0a0a0f] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-lg placeholder:text-slate-600"
              />
            </div>

            {/* Mode Selection */}
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 space-y-4">
              <p className="text-lg font-bold text-white mb-4">{t.whatWouldYouLikeToDo}</p>
              <button
                onClick={() => handleModeSelect('setup')}
                disabled={!userName || !agentName}
                className={`w-full px-6 py-4 rounded-xl font-semibold transition-all text-lg ${
                  userName && agentName
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span className="mr-2">🚀</span> {t.newSetup}
              </button>
              <button
                onClick={() => handleModeSelect('reconfigure')}
                disabled={!userName || !agentName}
                className={`w-full px-6 py-4 rounded-xl font-semibold transition-all text-lg border border-white/10 ${
                  userName && agentName
                    ? 'bg-[#1a1a25] text-white hover:bg-[#252535] hover:border-white/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span className="mr-2">⚙️</span> {t.reconfigure}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Setup flow
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="fixed inset-0 bg-mesh opacity-60 pointer-events-none" />
      
      <nav className="relative z-10 border-b border-white/10 py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-start">
          <div>
            <a href="/" className="flex items-center gap-3 group mb-2">
              <img src="/images/agentbearcorps-logo.png" alt="Agent Bear Corps" className="w-10 h-10 rounded-lg animate-float object-cover" />
              <span className="text-xl font-bold text-white">Agent Bear Corps</span>
            </a>
            <p className="text-slate-400 text-sm">{t.subtitle}</p>
            {userName && (
              <p className="text-indigo-400 font-semibold text-sm mt-1">{userName} • {agentName}</p>
            )}
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 bg-[#12121a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="en">English</option>
          </select>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {setupSteps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s.number
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-[#12121a] border border-white/10 text-slate-500'
                  }`}
                >
                  {step > s.number ? '✓' : s.number}
                </div>
                {idx < setupSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors rounded-full ${
                      step > s.number ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 min-h-96">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <img src="/images/agent-coder.png" alt="Welcome" className="w-20 h-20 object-cover rounded-xl" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{t.welcome}, {userName}! 👋</h2>
                  <p className="text-slate-400">Agent: {agentName}</p>
                </div>
              </div>
              
              <p className="text-slate-400">{t.welcomeDesc}</p>
              <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6">
                <p className="text-white font-semibold mb-4">{t.youllNeed}</p>
                <ul className="space-y-3">
                  {[
                    { icon: '🧠', text: t.apiKey },
                    { icon: '💰', text: t.binanceOptional },
                    { icon: '💬', text: t.telegramToken },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-400">
                      <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <img src="/images/agent-wizard.png" alt="AI Model" className="w-20 h-20 object-cover rounded-xl" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{t.chooseModel}</h2>
                </div>
              </div>

              {/* Claude 3.5 Sonnet */}
              <div className="border-2 border-indigo-500 rounded-xl p-6 bg-indigo-500/10 relative">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {t.recommended}
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">Claude 3.5 Sonnet</h3>
                    <p className="text-slate-400 text-sm">Best reasoning for crypto analysis</p>
                  </div>
                  <input 
                    type="radio" 
                    name="model" 
                    value="claude" 
                    checked={config.model === 'claude'} 
                    onChange={(e) => setConfig({ ...config, model: e.target.value })} 
                    className="w-5 h-5 accent-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Cost: $3/1M tokens</div>
                  <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Speed: 3-5s</div>
                  <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Full tool support</div>
                  <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Excellent reasoning</div>
                </div>                
                <a 
                  href="https://console.anthropic.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Get API Key →
                </a>
              </div>

              {/* GPT-4o */}
              <div className="border border-white/20 rounded-xl p-6 bg-white/5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">GPT-4o</h3>
                    <p className="text-slate-400 text-sm">Reliable alternative, excellent reasoning</p>
                  </div>
                  <input 
                    type="radio" 
                    name="model" 
                    value="gpt4o" 
                    checked={config.model === 'gpt4o'} 
                    onChange={(e) => setConfig({ ...config, model: e.target.value })} 
                    className="w-5 h-5 accent-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2"><span className="text-blue-400">●</span> Cost: $5/1M tokens</div>
                  <div className="flex items-center gap-2"><span className="text-blue-400">●</span> Speed: 2-4s</div>
                  <div className="flex items-center gap-2"><span className="text-blue-400">●</span> Full tool support</div>
                  <div className="flex items-center gap-2"><span className="text-blue-400">●</span> Great reasoning</div>
                </div>
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Get API Key →
                </a>
              </div>

              {/* Gemini 2.0 Flash */}
              <div className="border border-white/20 rounded-xl p-6 bg-white/5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">Gemini 2.0 Flash</h3>
                    <p className="text-slate-400 text-sm">Fast & cost-effective option</p>
                  </div>
                  <input 
                    type="radio" 
                    name="model" 
                    value="gemini" 
                    checked={config.model === 'gemini'} 
                    onChange={(e) => setConfig({ ...config, model: e.target.value })} 
                    className="w-5 h-5 accent-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2"><span className="text-cyan-400">●</span> Cost: $0.075/1M tokens</div>
                  <div className="flex items-center gap-2"><span className="text-cyan-400">●</span> Speed: 1-3s</div>
                  <div className="flex items-center gap-2"><span className="text-cyan-400">●</span> Good quality</div>
                  <div className="flex items-center gap-2"><span className="text-cyan-400">●</span> Best value</div>
                </div>
                <a 
                  href="https://aistudio.google.com/apikey" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Get API Key →
                </a>
              </div>

              {/* Kimi */}
              <div className="border border-white/20 rounded-xl p-6 bg-white/5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">Kimi (Moonshot)</h3>
                    <p className="text-slate-400 text-sm">Bilingual, long context, international markets</p>
                  </div>
                  <input 
                    type="radio" 
                    name="model" 
                    value="kimi" 
                    checked={config.model === 'kimi'} 
                    onChange={(e) => setConfig({ ...config, model: e.target.value })} 
                    className="w-5 h-5 accent-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2"><span className="text-amber-400">●</span> Cost: $1.4/1M tokens</div>
                  <div className="flex items-center gap-2"><span className="text-amber-400">●</span> Speed: 2-4s</div>
                  <div className="flex items-center gap-2"><span className="text-amber-400">●</span> 200k context</div>
                  <div className="flex items-center gap-2"><span className="text-amber-400">●</span> 中文 support</div>
                </div>
                <a 
                  href="https://platform.moonshot.cn" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Get API Key →
                </a>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <img src="/images/bear-researcher.png" alt="Exchanges" className="w-20 h-20 object-cover rounded-xl" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{t.configureExchanges}</h2>
                  <p className="text-slate-400 text-sm">Select CEX and DEX options</p>
                </div>
              </div>

              {/* CEX Section */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-lg text-white mb-4">🏦 Centralized Exchanges (CEX)</h3>
                
                {/* Binance */}
                <div className="border border-white/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Binance</h4>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-500" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">API Key</label>
                      <input 
                        type="password" 
                        placeholder="Binance API Key" 
                        className="w-full px-4 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">API Secret</label>
                      <input 
                        type="password" 
                        placeholder="Binance API Secret" 
                        className="w-full px-4 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                      />
                    </div>
                    <a href="https://www.binance.com/en/account/api-management" target="_blank" rel="noopener noreferrer" className="text-indigo-400 text-sm hover:text-indigo-300">Get keys →</a>
                  </div>
                </div>

                {/* Kraken */}
                <div className="border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Kraken</h4>
                    <input type="checkbox" className="w-5 h-5 accent-indigo-500" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">API Key</label>
                      <input 
                        type="password" 
                        placeholder="Kraken API Key" 
                        className="w-full px-4 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">API Secret</label>
                      <input 
                        type="password" 
                        placeholder="Kraken API Secret" 
                        className="w-full px-4 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                      />
                    </div>
                    <a href="https://www.kraken.com/u/settings/api" target="_blank" rel="noopener noreferrer" className="text-indigo-400 text-sm hover:text-indigo-300">Get keys →</a>
                  </div>
                </div>
              </div>

              {/* DEX Section */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-lg text-white mb-4">🔄 Decentralized Exchanges (DEX)</h3>
                
                {/* Ethereum DEXes */}
                <div className="mb-6">
                  <h4 className="text-slate-400 font-semibold mb-3 flex items-center gap-2">
                    <span className="text-purple-400">◆</span> Ethereum
                  </h4>
                  
                  <div className="space-y-3 ml-4">
                    {/* Uniswap V3 */}
                    <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5">
                      <input type="checkbox" className="w-5 h-5 accent-indigo-500" />
                      <div>
                        <p className="font-semibold text-white">Uniswap V3</p>
                        <p className="text-xs text-slate-400">Most liquidity for Ethereum tokens</p>
                      </div>
                    </label>

                    {/* 1inch */}
                    <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5">
                      <input type="checkbox" className="w-5 h-5 accent-indigo-500" />
                      <div>
                        <p className="font-semibold text-white">1inch (Aggregator)</p>
                        <p className="text-xs text-slate-400">Find best prices across DEXes</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Solana DEXes */}
                <div>
                  <h4 className="text-slate-400 font-semibold mb-3 flex items-center gap-2">
                    <span className="text-blue-400">◆</span> Solana
                  </h4>
                  
                  <div className="space-y-3 ml-4">
                    {/* Raydium */}
                    <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5">
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-500" />
                      <div>
                        <p className="font-semibold text-white">Raydium</p>
                        <p className="text-xs text-slate-400">Best liquidity on Solana</p>
                      </div>
                    </label>

                    {/* Jupiter */}
                    <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5">
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-500" />
                      <div>
                        <p className="font-semibold text-white">Jupiter (Aggregator)</p>
                        <p className="text-xs text-slate-400">Best prices across Solana DEXes</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <img src="/images/bear-teal.png" alt="Telegram" className="w-20 h-20 object-cover rounded-xl" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{t.connectTelegram}</h2>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-lg text-white">{t.createBot}</h3>                
                <a 
                  href="https://t.me/BotFather" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
                >
                  {t.openBotFather} →
                </a>
              </div>

              <div className="border border-white/10 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-lg text-white">{t.pasteBotToken}</h3>                
                <input 
                  type="password" 
                  placeholder={t.enterTelegramToken} 
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                />                
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold">
                  {t.validate}
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center mb-6">
                <img src="/images/agent-celebration.png" alt="Success" className="w-32 h-32 object-cover rounded-xl" />
              </div>
              
              <h2 className="text-3xl font-bold gradient-text">{t.youreAllSet}</h2>
              <p className="text-lg text-slate-400">{t.agentReady.replace('({agentName})', '')} ({agentName})</p>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 space-y-3 text-left">
                <h3 className="font-bold text-white">{t.whatsNext}</h3>                
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center gap-3">
                    <span className="text-green-400">✓</span> {t.agentRunning}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-400">✓</span> {t.chatBot}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-400">✓</span> {t.tryCommands}
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 justify-center">                
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                  <span className="mr-2">🚀</span> {t.launchAgent}
                </button>                
                <a 
                  href="https://github.com/jpmoregain-eth/agentbear" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/10 text-white rounded-xl hover:bg-white/5 font-semibold"
                >
                  {t.viewDocs}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">          
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${step === 1 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'border border-white/10 text-white hover:bg-white/5'}`}
          >
            {t.back}
          </button>          
          <button
            onClick={handleNext}
            disabled={step === 5}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${step === 5 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/25'}`}
          >
            {t.next} →
          </button>
        </div>
      </div>
    </div>
  );
}