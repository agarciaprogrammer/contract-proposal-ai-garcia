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
        <header className="border-b border-[var(--border)] bg-white/80 backdrop-blur shadow-sm fade-in">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-[var(--primary)] tracking-tight hover:text-[var(--accent)] transition-colors duration-200">
                CONTRACT.AI
              </Link>
              <div className="flex items-center space-x-6 text-lg font-bold">
                <Link href="/company" className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-200">
                  Company
                </Link>
                <Link href="/contracts" className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-200">
                  Contracts
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* ---------- MAIN ---------- */}
        <main className="flex-1 max-w-4xl mx-auto fade-in">{children}</main>

        {/* ---------- FOOTER ---------- */}
        <footer className="bg-white/80 border-t border-[var(--border)] shadow-sm mt-8 fade-in">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-[var(--primary)]">
            © {new Date().getFullYear()} Gunn Construction LLC. Construido para la velocidad, construido para ganar.
          </div>
        </footer>
      </body>
    </html>
  );
}