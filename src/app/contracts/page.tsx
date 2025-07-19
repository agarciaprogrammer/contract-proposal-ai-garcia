import Link from "next/link";
import { loadAllContracts } from "@/lib/data";

export default function ContractsIndex() {
  const contracts = loadAllContracts();

  return (
    <main className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Select a Contract</h1>
      <ul className="space-y-4">
        {contracts.map((c) => (
          <li key={c.id} className="border p-4 rounded shadow">
            <Link href={`/contracts/${c.id}`} className="hover:underline">
              <h2 className="text-xl font-semibold">{c.title}</h2>
              <p className="text-sm text-gray-600">
                {c.agencyName} • NAICS {c.naicsCode}
              </p>
              <p className="text-sm text-red-600">
                Due {new Date(c.deadlineDate).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}