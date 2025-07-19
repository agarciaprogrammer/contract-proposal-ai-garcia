import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto py-20 px-4 text-center fade-in overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 slide-up bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Contract Proposal AI
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-[var(--secondary)] leading-relaxed mb-8 slide-up max-w-3xl mx-auto" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
            Transform government contract opportunities into winning proposals with AI-powered precision and speed.
          </p>
          <p className="text-lg text-[var(--secondary)] mb-12 slide-up max-w-2xl mx-auto" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            Upload an RFQ, configure your company profile, and watch our advanced AI generate professional, compliant proposals in minutes—tailored to your unique strengths and capabilities.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 slide-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <Link
              href="/contracts"
              className="group w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Explore Contracts</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/company"
              className="group w-full sm:w-auto inline-flex items-center justify-center border-2 border-[var(--primary)] bg-white text-[var(--primary)] px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-[var(--muted)]"
            >
              <span>View Company Profile</span>
              <svg className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold text-[var(--primary)] mb-4">
              Why Choose Contract.AI?
            </h2>
            <p className="text-xl text-[var(--secondary)] max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with deep government contracting expertise to deliver results that win.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 slide-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)] mb-4">Lightning Fast</h3>
              <p className="text-[var(--secondary)] leading-relaxed">
                Generate comprehensive proposals in minutes, not days. Our AI processes RFQs instantly and creates tailored responses that meet all requirements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 slide-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)] mb-4">Compliance Guaranteed</h3>
              <p className="text-[var(--secondary)] leading-relaxed">
                Built-in compliance checks ensure your proposals meet all federal regulations, FAR clauses, and solicitation requirements automatically.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 slide-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)] mb-4">Tailored to You</h3>
              <p className="text-[var(--secondary)] leading-relaxed">
                Every proposal is customized to highlight your company&apos;s unique strengths, past performance, and competitive advantages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="slide-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
              <div className="text-4xl font-bold mb-2">99.7%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div className="slide-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Proposals Generated</div>
            </div>
            <div className="slide-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <div className="text-4xl font-bold mb-2">100x</div>
              <div className="text-blue-100">Faster Than Manual</div>
            </div>
            <div className="slide-up" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <div className="text-4xl font-bold mb-2">$500M+</div>
              <div className="text-blue-100">Contracts Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="slide-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
            <h2 className="text-4xl font-bold text-[var(--primary)] mb-6">
              Ready to Win More Contracts?
            </h2>
            <p className="text-xl text-[var(--secondary)] mb-8 max-w-2xl mx-auto">
              Join hundreds of successful contractors who are already using Contract.AI to streamline their proposal process and increase their win rates.
            </p>
            <Link
              href="/contracts"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}