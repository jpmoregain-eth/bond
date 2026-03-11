import './globals.css'

export const metadata = {
  title: 'Bond - AI Agent Platform',
  description: 'Open-source AI agents that find opportunities across crypto markets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  )
}
