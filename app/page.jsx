'use client'

import { useState, useEffect } from 'react'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])
  
  return <span>{count}{suffix}</span>
}

// Agent Card Component
function AgentCard({ image, name, role, color }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden
        transition-all duration-300 ease-out
        ${isHovered ? 'transform -translate-y-2 border-indigo-500/50' : ''}
      `}>
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : ''}
        `}
          style={{
            background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)`
          }}
        />
        <div className="relative z-10">
          <div className="aspect-square overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className={`
                w-full h-full object-cover transition-transform duration-300
                ${isHovered ? 'scale-105' : ''}
              `}
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-semibold text-white mb-1">{name}</h3>
            <p className="text-sm text-slate-400">{role}</p>
          </div>
        </div>
        
        <div className={`
          absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-${color}-500 to-transparent
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} 
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-[#12121a] border border-white/10 rounded-2xl p-8 h-full
        hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
      >
        <div className={`
          w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6
          ${gradient}
        `}>
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Timeline Item Component
function TimelineItem({ phase, date, title, description, isLeft }) {
  return (
    <div className={`flex items-center mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300">
          <span className="text-indigo-400 font-semibold text-sm">{date}</span>
          <h3 className="text-lg font-semibold text-white mt-2 mb-2">{title}</h3>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
      </div>
      
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold z-10 animate-pulse-glow"
        >
          {phase}
        </div>
      </div>
      
      <div className="w-1/2" />
    </div>
  )
}

// Stats Component
function Stats() {
  const stats = [
    { value: 100, suffix: '%', label: 'Open Source' },
    { value: 6, suffix: '+', label: 'Agent Types' },
    { value: 1, suffix: '', label: 'Command Setup' },
    { value: 0, suffix: '', label: 'Docker Needed' },
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-slate-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// Main Page Component
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const agents = [
    { image: '/images/agent-coder.png', name: 'Trading', role: 'Crypto Agent', color: '#22c55e' },
    { image: '/images/agent-wizard.png', name: 'Coder', role: 'Dev Agent', color: '#8b5cf6' },
    { image: '/images/bear-researcher.png', name: 'Research', role: 'Analysis Agent', color: '#3b82f6' },
    { image: '/images/agent-idea.png', name: 'Strategy', role: 'Planner Agent', color: '#f59e0b' },
    { image: '/images/bear-teal.png', name: 'Social', role: 'Community Agent', color: '#14b8a6' },
    { image: '/images/bear-blue.png', name: 'Support', role: 'Helper Agent', color: '#6366f1' },
  ]

  const features = [
    {
      icon: '🎯',
      title: 'Simple',
      description: 'No Docker. No configuration nightmares. Download, install, pick an agent, and start working via Telegram.',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
    },
    {
      icon: '🔧',
      title: 'Modular',
      description: 'Platform and agents are separate. Build agents independently. Community contributes. Ecosystem grows.',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: '🔓',
      title: 'Open Source',
      description: '100% open source. No vendor lock-in. Run locally or in the cloud. You own your data. MIT licensed.',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
    },
    {
      icon: '🧠',
      title: 'Intelligent',
      description: 'Powered by Claude and GPT. Smart reasoning for analysis, research synthesis, coding, and automation.',
      gradient: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
    },
    {
      icon: '📦',
      title: 'Specialized Agents',
      description: 'Each agent does one thing really well. Crypto trading, code review, research, social automation, and more.',
      gradient: 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20'
    },
    {
      icon: '💬',
      title: 'Telegram Native',
      description: 'Interface through Telegram. Get notifications, issue commands, and monitor your agents from anywhere.',
      gradient: 'bg-gradient-to-br from-sky-500/20 to-blue-500/20'
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-mesh opacity-60 pointer-events-none" />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <img src="/images/bear-teal.png" alt="AgentBear" className="w-10 h-10 rounded-lg animate-float object-cover" />
            <span className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              AgentBear
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Roadmap'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-slate-400 hover:text-white transition-colors font-medium"
              >
                {item}
              </a>
            ))}
            <a
              href="https://github.com/jpmoregain-eth/agentbear"
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              GitHub
            </a>
          </div>
          
          <a
            href="https://github.com/jpmoregain-eth/agentbear"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 
              text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/25 
              transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>⭐</span> Star on GitHub
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 
                rounded-full px-4 py-2 mb-8"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-indigo-400 font-medium text-sm">Open Source AI Agent Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                AI Agents That{' '}
                <span className="gradient-text">Find Opportunities</span>
              </h1>
              
              <p className="text-xl text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Download, install, and deploy autonomous AI agents in minutes. 
                No Docker. No complex configuration. Just pure AI automation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/setup"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 
                    to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg
                    hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1"
                >
                  <span>🚀</span> DEMO
                </a>
                
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 
                    text-white px-8 py-4 rounded-xl font-semibold text-lg
                    hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <span>📖</span> Learn More
                </a>
              </div>
              
              <Stats />
            </div>
            
            {/* Hero Visual - Agent Grid */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-3xl blur-3xl" />
              
              <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-4"
                style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)' }}
              >
                {agents.map((agent, idx) => (
                  <AgentCard key={idx} {...agent} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why AgentBear?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built for simplicity. Designed for scale. Made for the community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-slate-400">From zero to autonomous AI agent in three simple steps.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Clone & Install', desc: 'Clone the repo and install dependencies with pip. No Docker required.' },
              { step: '02', title: 'Configure', desc: 'Copy the example config, add your API keys, and pick your agent type.' },
              { step: '03', title: 'Deploy', desc: 'Run the agent and start chatting via Telegram. AI does the rest.' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 text-center h-full
                  hover:border-indigo-500/30 transition-all duration-300 group"
                >
                  <div className="text-6xl font-bold gradient-text mb-4 opacity-50 group-hover:opacity-100 transition-opacity"
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
                
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-purple-500/5" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Roadmap</h2>
            <p className="text-xl text-slate-400">Where we're headed. Built in public, with the community.</p>
          </div>
          
          <div className="space-y-8">
            {[
              { phase: '1', date: 'Month 1', title: 'Crypto Agent MVP', desc: 'Multi-exchange trading agent with Claude-powered analysis. Live and ready.' },
              { phase: '2', date: 'Months 2-3', title: 'Validation', desc: 'Real users, real feedback. Iterate and improve based on community input.' },
              { phase: '3', date: 'Months 4-7', title: 'Expansion', desc: 'Research agent, social automation. Decouple to server/client architecture.' },
              { phase: '4', date: 'Months 8-12', title: 'Ecosystem', desc: 'Community platform. Agent marketplace. Build, share, and monetize agents.' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 
                  flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/30"
                >
                  {item.phase}
                </div>
                
                <div className="flex-grow bg-[#12121a] border border-white/10 rounded-2xl p-6
                  hover:border-indigo-500/30 transition-all duration-300"
                >
                  <span className="text-indigo-400 font-semibold text-sm">{item.date}</span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-30" />
            
            <div className="relative bg-[#12121a] border border-white/10 rounded-3xl p-12 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">Ready to Build?</h2>
                
                <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                  Join us on GitHub. Contribute. Build agents. Shape the future of AI automation.
                </p>
                
                <a
                  href="https://github.com/jpmoregain-eth/agentbear"
                  className="inline-flex items-center gap-2 bg-white text-[#0a0a0f] px-8 py-4 rounded-xl 
                    font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span>⭐</span> Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <img src="/images/bear-teal.png" alt="AgentBear" className="w-10 h-10 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110" />
              <span className="font-bold text-white">AgentBear</span>
            </div>
            
            <div className="flex gap-6">
              {['GitHub', 'Documentation', 'Community'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            
            <p className="text-slate-500 text-sm">
              Open Source AI Agent Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
