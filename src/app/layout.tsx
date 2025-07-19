import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Contract Proposal Generator",
  description: "Generate winning proposals for government contracts in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      >
        {/* ---------- NAV ---------- */}
        <header className="border-b border-[var(--border)] bg-white/95 backdrop-blur-md shadow-sm fade-in sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Main Navigation */}
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-2xl font-bold text-[var(--accent)] tracking-tight hover:text-[var(--accent)] transition-colors duration-200">
                  CONTRACT.AI
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                  <Link href="/contracts" className="text-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 font-medium">
                    Contracts
                  </Link>
                  <Link href="/company" className="text-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 font-medium">
                    My Company
                  </Link>
                </div>
              </div>

              {/* User Section - Right Side */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-[var(--primary)] hover:text-[var(--accent)] hover:bg-[var(--muted)] rounded-full transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75a6 6 0 001.5 4.5v3.75a1.5 1.5 0 003 0v-3.75a6 6 0 001.5-4.5v-3.75a6 6 0 00-6-6z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* User Avatar */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    GC
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-[var(--primary)]">GUNN CONSTRUCTION</div>
                    <div className="text-xs text-[var(--secondary)]">Premium Account</div>
                  </div>
                </div>

                {/* Settings Dropdown */}
                <button className="p-2 text-[var(--primary)] hover:text-[var(--accent)] hover:bg-[var(--muted)] rounded-full transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* ---------- MAIN ---------- */}
        <main className="flex-1 max-w-4xl mx-auto fade-in">{children}</main>

        {/* ---------- FOOTER ---------- */}
        <footer className="bg-white/80 border-t border-[var(--border)] shadow-sm mt-8 fade-in">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-[var(--primary)]">
            © {new Date().getFullYear()} CONTRACT.AI - Built for speed, built to win.
          </div>
        </footer>
      </body>
    </html>
  );
}