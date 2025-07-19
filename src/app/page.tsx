import Link from "next/link";

export default function HomePage() {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-200">
        AI-Powered Contract Proposals
      </h1>
      <p className="mt-4 text-lg text-slate-400 leading-relaxed">
        Upload an RFQ, add your company profile, and let our AI craft a
        winning proposal in minutes—tailored to YOUR strengths.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/contracts"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-700"
        >
          Browse Contracts
        </Link>
        <Link
          href="/company"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          View Company Profile
        </Link>
      </div>
    </section>
  );
}