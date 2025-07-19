import { notFound } from "next/navigation";
import { loadAllContracts } from "@/lib/data";

interface Props {
  params: { id: string };
}

export default function ContractDetail({ params }: Props) {
  const contract = loadAllContracts().find((c) => c.id === params.id);
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
    </main>
  );
}