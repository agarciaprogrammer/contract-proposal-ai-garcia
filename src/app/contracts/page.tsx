import Link from "next/link";
import { loadAllContracts } from "@/lib/data";

export default function ContractsIndex() {
  const contracts = loadAllContracts();

  return (
    <main className="p-8 max-w-4xl fade-in">
      <h1 className="text-4xl font-bold mb-8 slide-up">Select a Contract</h1>
      <ul className="space-y-6">
        {contracts.map((c, i) => (
          <li key={c.id} className="card p-6 flex flex-col gap-2 slide-up" style={{animationDelay: `${0.1 + i * 0.05}s`, animationFillMode: 'both'}}>
            <Link href={`/contracts/${c.id}`} className="hover:underline">
              <h2 className="text-2xl font-semibold text-[var(--primary)]">{c.title}</h2>
              <p className="text-sm text-[var(--secondary)]">
                {c.agencyName} • NAICS {c.naicsCode}
              </p>
              <p className="text-sm text-[var(--accent)]">
                Due {new Date(c.deadlineDate).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}