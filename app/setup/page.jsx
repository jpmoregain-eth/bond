'use client';

import { useState } from 'react';

export default function SetupWizard() {
  const [mode, setMode] = useState('setup'); // 'setup' or 'reconfigure'
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    model: 'claude',
    binanceKey: 'api_key_****',
    binanceSecret: 'secret_****',
    telegramToken: 'token_****',
  });
  
  const [reconfigureAction, setReconfigureAction] = useState('');

  const [validated, setValidated] = useState({
    model: true,
    binance: true,
    telegram: true,
  });

  const setupSteps = [
    { number: 1, title: 'Welcome', description: 'Get started' },
    { number: 2, title: 'Model', description: 'Choose AI model' },
    { number: 3, title: 'Exchanges', description: 'Connect exchanges' },
    { number: 4, title: 'Telegram', description: 'Connect messaging' },
    { number: 5, title: 'Complete', description: 'All set!' },
  ];

  const reconfigureSteps = [
    { number: 1, title: 'Welcome Back', description: 'What to add?' },
    { number: 2, title: 'Select', description: 'Choose option' },
    { number: 3, title: 'Configure', description: 'Add credentials' },
    { number: 4, title: 'Merge', description: 'Save & restart' },
  ];

  const currentSteps = mode === 'setup' ? setupSteps : reconfigureSteps;

  const handleValidate = (field) => {
    setValidated(prev => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    const maxStep = mode === 'setup' ? 5 : 4;
    if (step < maxStep) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleModeToggle = (newMode) => {
    setMode(newMode);
    setStep(1);
    setReconfigureAction('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with Mode Toggle */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bond Setup Wizard</h1>
              <p className="text-gray-600 mt-2">
                {mode === 'setup' 
                  ? 'Configure your Crypto Agent in 5 minutes'
                  : 'Add new exchanges and APIs to your existing setup'}
              </p>
            </div>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => handleModeToggle('setup')}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  mode === 'setup'
                    ? 'bg-white text-teal-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                New Setup
              </button>
              <button
                onClick={() => handleModeToggle('reconfigure')}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  mode === 'reconfigure'
                    ? 'bg-white text-teal-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Reconfigure
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {currentSteps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s.number
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s.number ? '✓' : s.number}
                </div>
                {idx < currentSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      step > s.number ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={`grid gap-2 mt-4`} style={{gridTemplateColumns: `repeat(${currentSteps.length}, 1fr)`}}>
            {currentSteps.map(s => (
              <div key={s.number} className="text-center">
                <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                <p className="text-xs text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 min-h-96">
          {mode === 'setup' && (
            <>
              {/* FRESH SETUP MODE */}
              
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Bond</h2>
                    <p className="text-gray-600 mb-4">
                      This wizard will guide you through setting up the Crypto Agent in just a few minutes.
                    </p>
                    <p className="text-gray-600 mb-6">
                      You'll need:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <span className="text-teal-600">✓</span>
                        <span className="text-gray-700">API key from Claude (Anthropic)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-teal-600">✓</span>
                        <span className="text-gray-700">Binance API credentials (optional)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-teal-600">✓</span>
                        <span className="text-gray-700">Telegram bot token</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Model</h2>

                  <div className="border-2 border-teal-600 rounded-lg p-6 bg-teal-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Claude 3.5 Sonnet</h3>
                        <p className="text-sm text-teal-700 font-semibold">⭐ Recommended</p>
                      </div>
                      <input
                        type="radio"
                        name="model"
                        value="claude"
                        checked={config.model === 'claude'}
                        onChange={(e) => setConfig({ ...config, model: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
                      <div>Cost: $3 per 1M tokens</div>
                      <div>Speed: 3-5 seconds</div>
                      <div>Tool Support: ✓ Full</div>
                      <div>Reasoning: ✓ Excellent</div>
                    </div>
                    <button
                      onClick={() => window.open('https://console.anthropic.com', '_blank')}
                      className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-2"
                    >
                      Get API Key 🔗
                    </button>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">GPT-4o</h3>
                        <p className="text-sm text-gray-600">Alternative</p>
                      </div>
                      <input
                        type="radio"
                        name="model"
                        value="gpt4"
                        checked={config.model === 'gpt4'}
                        onChange={(e) => setConfig({ ...config, model: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
                      <div>Cost: $5 per 1M tokens</div>
                      <div>Speed: 2-4 seconds</div>
                      <div>Tool Support: ✓ Full</div>
                      <div>Reasoning: ✓ Excellent</div>
                    </div>
                    <button
                      onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                    >
                      Get API Key 🔗
                    </button>
                  </div>

                  {config.model && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                      <span className="text-green-600">✓</span>
                      <span className="text-green-800">Model selected: {config.model === 'claude' ? 'Claude Sonnet' : 'GPT-4o'}</span>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Configure Exchanges</h2>

                  <div className="border border-gray-300 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-gray-900">Binance</h3>
                      <input
                        type="checkbox"
                        defaultChecked
                        onChange={(e) => {
                          if (!e.target.checked) {
                            setConfig({ ...config, binanceKey: '', binanceSecret: '' });
                          }
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        API Key
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your Binance API key"
                        value={config.binanceKey}
                        onChange={(e) => setConfig({ ...config, binanceKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        API Secret
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your Binance API secret"
                        value={config.binanceSecret}
                        onChange={(e) => setConfig({ ...config, binanceSecret: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (config.binanceKey && config.binanceSecret) {
                            handleValidate('binance');
                          }
                        }}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold"
                      >
                        Validate
                      </button>
                      <button
                        onClick={() => window.open('https://www.binance.com/en/account/manage-api-key', '_blank')}
                        className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-semibold flex items-center gap-2"
                      >
                        Get Keys 🔗
                      </button>
                    </div>

                    {validated.binance && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-green-800 text-sm">Credentials valid!</span>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-gray-900">Raydium (Solana)</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm text-green-700 font-semibold">Auto-enabled</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">No authentication required - public RPC</p>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Connect Telegram</h2>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">1. Create a Telegram Bot</h3>
                    <p className="text-gray-700 text-sm">
                      Open Telegram and message BotFather to create your bot:
                    </p>
                    <button
                      onClick={() => window.open('https://t.me/BotFather', '_blank')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2 w-fit"
                    >
                      Open @BotFather 🔗
                    </button>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-6 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">2. Paste Your Bot Token</h3>
                    <input
                      type="password"
                      placeholder="Enter your Telegram bot token"
                      value={config.telegramToken}
                      onChange={(e) => setConfig({ ...config, telegramToken: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={() => handleValidate('telegram')}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold"
                    >
                      Validate
                    </button>
                  </div>

                  {validated.telegram && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                      <span className="text-green-600">✓</span>
                      <div>
                        <p className="text-green-800 font-semibold">Connected!</p>
                        <p className="text-green-700 text-sm">Your agent is listening on Telegram</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6 text-center">
                  <div className="text-6xl">🎉</div>
                  <h2 className="text-3xl font-bold text-gray-900">You're All Set!</h2>
                  <p className="text-lg text-gray-600">
                    Your Bond Crypto Agent is ready to find opportunities
                  </p>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 space-y-3 text-left">
                    <h3 className="font-bold text-gray-900">What's next:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <span className="text-teal-600">✓</span>
                        <span>Agent is running on port 8080</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-teal-600">✓</span>
                        <span>Chat with your bot on Telegram (@YourBondBot)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-teal-600">✓</span>
                        <span>Try: "Find opportunities" or "Analyze BTC"</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold">
                      Launch Agent
                    </button>
                    <button
                      onClick={() => window.open('https://github.com/jpmoregain-eth/bond', '_blank')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold flex items-center gap-2"
                    >
                      View Docs 🔗
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {mode === 'reconfigure' && (
            <>
              {/* RECONFIGURE MODE */}
              
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, Derek! 👋</h2>
                  
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">Current Configuration:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-teal-200">
                        <span className="text-gray-700">Model</span>
                        <span className="font-semibold text-gray-900">Claude Sonnet <span className="text-green-600">✓</span></span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-teal-200">
                        <span className="text-gray-700">Exchanges</span>
                        <span className="font-semibold text-gray-900">Binance, Raydium <span className="text-green-600">✓</span></span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Telegram</span>
                        <span className="font-semibold text-gray-900">Connected <span className="text-green-600">✓</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 font-semibold">What would you like to do?</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="action"
                          value="exchange"
                          checked={reconfigureAction === 'exchange'}
                          onChange={(e) => setReconfigureAction(e.target.value)}
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Add another exchange</p>
                          <p className="text-sm text-gray-600">Connect Kraken, Bybit, or other CEX/DEX</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="action"
                          value="model"
                          checked={reconfigureAction === 'model'}
                          onChange={(e) => setReconfigureAction(e.target.value)}
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Add backup model</p>
                          <p className="text-sm text-gray-600">Set GPT-4o as fallback if Claude unavailable</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="action"
                          value="monitor"
                          checked={reconfigureAction === 'monitor'}
                          onChange={(e) => setReconfigureAction(e.target.value)}
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Add monitoring tools</p>
                          <p className="text-sm text-gray-600">Enable alerts for specific tokens or pairs</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="action"
                          value="view"
                          checked={reconfigureAction === 'view'}
                          onChange={(e) => setReconfigureAction(e.target.value)}
                        />
                        <div>
                          <p className="font-semibold text-gray-900">View agent statistics</p>
                          <p className="text-sm text-gray-600">Check memory, patterns found, uptime</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && reconfigureAction === 'exchange' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Exchange</h2>
                  <p className="text-gray-600">Available exchanges to add:</p>

                  <div className="space-y-3">
                    {[
                      { name: 'Kraken', status: 'Not added' },
                      { name: 'Bybit', status: 'Not added' },
                      { name: 'Coinbase', status: 'Not added' },
                      { name: 'Uniswap V3', status: 'Not added' },
                      { name: 'PancakeSwap', status: 'Not added' },
                    ].map(ex => (
                      <label key={ex.name} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="checkbox" defaultChecked={false} />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{ex.name}</p>
                        </div>
                        <span className="text-sm text-gray-600">{ex.status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && reconfigureAction === 'monitor' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Configure Monitoring</h2>
                  <p className="text-gray-600">What tokens/pairs do you want to monitor?</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tokens to track (comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., SOL, ETH, BTC, JUP"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alert threshold (%)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-gray-700">Alert on volume spikes</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && reconfigureAction === 'view' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Agent Statistics</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Uptime</p>
                      <p className="text-2xl font-bold text-gray-900">7d 14h</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Opportunities Found</p>
                      <p className="text-2xl font-bold text-gray-900">342</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Memory Used</p>
                      <p className="text-2xl font-bold text-gray-900">24 MB</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Conversations</p>
                      <p className="text-2xl font-bold text-gray-900">156</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Detected Patterns</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ SOL/USDC arbs every 2-3 hours (avg 0.6%)</li>
                      <li>✓ Morning volatility spike 8-10am UTC</li>
                      <li>✓ Weekend liquidity 30% lower</li>
                      <li>✓ BTC consolidation pattern detected</li>
                    </ul>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {reconfigureAction === 'exchange' && 'Kraken API Setup'}
                    {reconfigureAction === 'model' && 'Add GPT-4o'}
                    {reconfigureAction === 'monitor' && 'Monitoring Saved'}
                  </h2>

                  {reconfigureAction === 'exchange' && (
                    <>
                      <div className="border border-gray-300 rounded-lg p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">API Key</label>
                          <input type="password" placeholder="Enter Kraken API key" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">API Secret</label>
                          <input type="password" placeholder="Enter Kraken API secret" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <button
                          onClick={() => window.open('https://www.kraken.com/u/settings/api', '_blank')}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold flex items-center gap-2 w-fit"
                        >
                          Get Keys 🔗
                        </button>
                      </div>
                    </>
                  )}

                  {reconfigureAction === 'model' && (
                    <>
                      <div className="border border-orange-200 bg-orange-50 rounded-lg p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">GPT-4o as Fallback</h3>
                        <p className="text-gray-700 mb-4">If Claude is unavailable, your agent will automatically use GPT-4o.</p>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">OpenAI API Key</label>
                          <input type="password" placeholder="sk-..." className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3" />
                          <button
                            onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold flex items-center gap-2 w-fit"
                          >
                            Get Keys 🔗
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 text-center">
                  <div className="text-6xl">✨</div>
                  <h2 className="text-3xl font-bold text-gray-900">Configuration Updated!</h2>
                  <p className="text-lg text-gray-600">Your agent will restart in 30 seconds with the new settings</p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3 text-left">
                    <h3 className="font-bold text-gray-900">What's been preserved:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <span className="text-green-600">✓</span>
                        <span>All conversations (156 saved)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-600">✓</span>
                        <span>Market patterns (4 detected)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-600">✓</span>
                        <span>User preferences</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-600">✓</span>
                        <span>Opportunity history</span>
                      </li>
                    </ul>
                  </div>

                  <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold">
                    Got It!
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              step === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={step === (mode === 'setup' ? 5 : 4) || (mode === 'reconfigure' && step === 1 && !reconfigureAction)}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
              step === (mode === 'setup' ? 5 : 4) || (mode === 'reconfigure' && step === 1 && !reconfigureAction)
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
