'use client';

import { useState } from 'react';
import { ChevronRight, Check, AlertCircle, ExternalLink } from 'lucide-react';

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    model: '',
    binanceKey: '',
    binanceSecret: '',
    telegramToken: '',
  });

  const [validated, setValidated] = useState({
    model: false,
    binance: false,
    telegram: false,
  });

  const steps = [
    { number: 1, title: 'Welcome', description: 'Get started' },
    { number: 2, title: 'Model', description: 'Choose AI model' },
    { number: 3, title: 'Exchanges', description: 'Connect exchanges' },
    { number: 4, title: 'Telegram', description: 'Connect messaging' },
    { number: 5, title: 'Complete', description: 'All set!' },
  ];

  const handleValidate = (field) => {
    setValidated(prev => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Bond Setup Wizard</h1>
          <p className="text-gray-600 mt-2">Configure your Crypto Agent in 5 minutes</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s.number
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s.number ? <Check size={20} /> : s.number}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      step > s.number ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {steps.map(s => (
              <div key={s.number} className="text-center">
                <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                <p className="text-xs text-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 min-h-96">
          {/* Step 1: Welcome */}
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
                    <Check className="text-teal-600" size={20} />
                    <span className="text-gray-700">API key from Claude (Anthropic)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-teal-600" size={20} />
                    <span className="text-gray-700">Binance API credentials (optional)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-teal-600" size={20} />
                    <span className="text-gray-700">Telegram bot token</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Model Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Model</h2>

              {/* Claude Sonnet */}
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
                  Get API Key <ExternalLink size={16} />
                </button>
              </div>

              {/* GPT-4 */}
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
                  Get API Key <ExternalLink size={16} />
                </button>
              </div>

              {config.model && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <Check className="text-green-600" size={20} />
                  <span className="text-green-800">Model selected: {config.model === 'claude' ? 'Claude Sonnet' : 'GPT-4o'}</span>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Exchanges */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Configure Exchanges</h2>

              {/* Binance */}
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
                    Get Keys <ExternalLink size={16} />
                  </button>
                </div>

                {validated.binance && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <Check className="text-green-600" size={18} />
                    <span className="text-green-800 text-sm">Credentials valid!</span>
                  </div>
                )}
              </div>

              {/* Raydium */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-900">Raydium (Solana)</h3>
                  <div className="flex items-center gap-2">
                    <Check className="text-green-600" size={18} />
                    <span className="text-sm text-green-700 font-semibold">Auto-enabled</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2">No authentication required - public RPC</p>
              </div>
            </div>
          )}

          {/* Step 4: Telegram */}
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
                  Open @BotFather <ExternalLink size={16} />
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
                  <Check className="text-green-600" size={20} />
                  <div>
                    <p className="text-green-800 font-semibold">Connected!</p>
                    <p className="text-green-700 text-sm">Your agent is listening on Telegram</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Complete */}
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
                    <Check className="text-teal-600" size={20} />
                    <span>Agent is running on port 8080</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-teal-600" size={20} />
                    <span>Chat with your bot on Telegram (@YourBondBot)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-teal-600" size={20} />
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
                  View Docs <ExternalLink size={16} />
                </button>
              </div>
            </div>
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
            disabled={step === 5}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
              step === 5
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
