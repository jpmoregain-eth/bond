import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Agent Bear Corps 🐻 — AI Agents That Work for You',
  description: 'Open-source AI agent platform. Download, install, and deploy autonomous AI agents in minutes. No Docker. No complex configuration.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#0a0a0f] text-slate-100 antialiased">{children}</body>
    </html>
  )
}
