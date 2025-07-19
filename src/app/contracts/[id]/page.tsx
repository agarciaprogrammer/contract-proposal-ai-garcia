import { notFound } from "next/navigation";
import { loadAllContracts } from "@/lib/data";
import Link from "next/link";

// Next.js 15 signature
interface Props {
  params: Promise<{ id: string }>;
}

export default async function ContractDetail({ params }: Props) {
  const { id } = await params;               // <- await params
  const contract = loadAllContracts().find((c) => c.id === id);
  if (!contract) notFound();

  return (
    <main className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">{contract.title}</h1>
      <p className="text-gray-700 mb-1">
        <strong>Solicitation #:</strong> {contract.solicitationNumber}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Agency:</strong> {contract.agencyName}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>NAICS:</strong> {contract.naicsCode} – {contract.naicsName}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Response Due:</strong>{" "}
        {new Date(contract.deadlineDate).toLocaleString()}
      </p>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: contract.description }}
      />
      <Link
        href={`/proposals/${contract.id}`}
        className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Generate Proposal
      </Link>
    </main>
  );
}