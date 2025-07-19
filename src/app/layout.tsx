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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-slate-50 text-slate-800`}
      >
        {/* ---------- NAV ---------- */}
        <header className="border-b border-slate-200 bg-gray-900">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-semibold text-white">
                CONTRACT.AI
              </Link>
              <div className="flex items-center space-x-6 text-lg font-bold">
                <Link href="/company" className="text-white hover:text-slate-200">
                  Company
                </Link>
                <Link href="/contracts" className="text-white hover:text-slate-200">
                  Contracts
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* ---------- MAIN ---------- */}
        <main className="flex-1 max-w-4xl mx-auto ">{children}</main>

        {/* ---------- FOOTER ---------- */}
        <footer className="bg-gray-900 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-white">
            © {new Date().getFullYear()} Gunn Construction LLC. Built for speed, built to win.
          </div>
        </footer>
      </body>
    </html>
  );
}