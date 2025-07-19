import Link from "next/link";

export default function HomePage() {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4 text-center fade-in">
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 slide-up">
        Contract Proposal AI
      </h1>
      <p className="mt-4 text-xl text-[var(--secondary)] leading-relaxed mb-8 slide-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
        Upload an RFQ, add your company profile, and let our AI create a winning proposal in minutes—tailored to your strengths.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/contracts"
          className="w-full sm:w-auto inline-flex items-center justify-center btn-secondary px-7 py-3 text-lg font-semibold shadow transition-transform duration-300 slide-up"
          style={{animationDelay: '0.2s', animationFillMode: 'both'}}
        >
          Explore Contracts
        </Link>
        <Link
          href="/company"
          className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-[var(--primary)] bg-white text-[var(--primary)] px-7 py-3 text-lg font-semibold rounded-[var(--radius)] shadow hover:bg-[var(--muted)] hover:border-[var(--accent)] transition-all duration-300 slide-up"
          style={{animationDelay: '0.3s', animationFillMode: 'both'}}
        >
          View Company Profile
        </Link>
      </div>
    </section>
  );
}