export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-teal-600">🐻 AgentBear</div>
          <div className="flex gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#timeline" className="text-gray-600 hover:text-gray-900">Timeline</a>
            <a href="https://github.com/jpmoregain-eth/agentbear" className="text-gray-600 hover:text-gray-900">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          AI Agents That <span className="text-teal-600">Find Opportunities</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Open-source agent platform. Crypto trading analysis, research synthesis, social automation. Built for simplicity. Designed for scale.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/setup" className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700">
            Try Setup Wizard
          </a>
          <a href="https://github.com/jpmoregain-eth/agentbear" className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50">
            View on GitHub
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">The Problem OpenClaw Revealed</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-900 mb-2">Too Complex</h3>
              <p className="text-red-800">Users wanted AI agents. OpenClaw proved demand. But setup required Docker, APIs, configuration.</p>
            </div>
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-900 mb-2">Not User-Friendly</h3>
              <p className="text-red-800">Steep learning curve. Multi-layered features. Great for power users. Dead for everyone else.</p>
            </div>
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-900 mb-2">Monolithic</h3>
              <p className="text-red-800">Bloated platform. Hard to extend. Difficult to maintain. Not built for community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Solution</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Simple</h3>
            <p className="text-gray-600">Download. Install. Pick an agent. Talk on Telegram. Done. No Docker. No configuration nightmare.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Focused</h3>
            <p className="text-gray-600">Not everything for everyone. Specialized agents that do one thing really well.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Modular</h3>
            <p className="text-gray-600">Platform + Agents are separate. Build agents independently. Community contributes. Ecosystem grows.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Open</h3>
            <p className="text-gray-600">100% open source. No vendor lock-in. Run locally or in cloud. You own your data.</p>
          </div>
        </div>
      </section>

      {/* Phase 1 Agent */}
      <section className="bg-gradient-to-r from-teal-50 to-cyan-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Crypto Agent (Phase 1)</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Find trading opportunities across CEX and DEX. Multi-chain, multi-exchange analysis. Claude reasoning for smart decisions.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-lg mb-3">🔗 Multi-Exchange</h4>
              <p className="text-gray-600 text-sm">Binance, Kraken, Uniswap, Raydium, Jupiter, more.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-lg mb-3">⛓️ Multi-Chain</h4>
              <p className="text-gray-600 text-sm">Solana, Ethereum, BSC, Polygon. Expandable.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-lg mb-3">🧠 Intelligent</h4>
              <p className="text-gray-600 text-sm">Claude analyzes opportunities. Assesses risk. Explains reasoning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Roadmap</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">1</div>
            <h4 className="font-semibold mb-2">Month 1</h4>
            <p className="text-sm text-gray-600">Crypto Agent MVP shipped</p>
          </div>
          <div className="text-center">
            <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">2</div>
            <h4 className="font-semibold mb-2">Month 2-3</h4>
            <p className="text-sm text-gray-600">Real users, validate market</p>
          </div>
          <div className="text-center">
            <div className="bg-teal-400 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">3</div>
            <h4 className="font-semibold mb-2">Month 4-7</h4>
            <p className="text-sm text-gray-600">Add 1-2 agents, decouple platform</p>
          </div>
          <div className="text-center">
            <div className="bg-teal-300 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">4</div>
            <h4 className="font-semibold mb-2">Month 8-12</h4>
            <p className="text-sm text-gray-600">Community ecosystem</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-lg mb-8 opacity-90">Join us on GitHub. Contribute. Build agents. Shape the future of AI automation.</p>
          <a href="https://github.com/jpmoregain-eth/agentbear" className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block">
            View Repository
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>AgentBear - Open Source AI Agent Platform</p>
          <p className="text-sm mt-2">🐻 Where AI agents find opportunities.</p>
        </div>
      </footer>
    </div>
  )
}
