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
    <main className="p-8 max-w-4xl fade-in">
      <div className="card p-8 slide-up">
        <h1 className="text-4xl font-bold mb-2">{contract.title}</h1>
        <p className="text-[var(--secondary)] mb-1">
          <strong>Solicitación #:</strong> {contract.solicitationNumber}
        </p>
        <p className="text-[var(--secondary)] mb-1">
          <strong>Agencia:</strong> {contract.agencyName}
        </p>
        <p className="text-[var(--secondary)] mb-1">
          <strong>NAICS:</strong> {contract.naicsCode} – {contract.naicsName}
        </p>
        <p className="text-[var(--accent)] mb-4">
          <strong>Respuesta vence:</strong> {new Date(contract.deadlineDate).toLocaleString()}
        </p>
        <div
          className="prose prose-sm max-w-none text-[var(--foreground)]"
          dangerouslySetInnerHTML={{ __html: contract.description }}
        />
        <Link
          href={`/proposals/${contract.id}`}
          className="mt-6 inline-block btn-secondary px-6 py-2 text-base font-medium shadow slide-up"
          style={{animationDelay: '0.1s', animationFillMode: 'both'}}
        >
          Generar Propuesta
        </Link>
      </div>
    </main>
  );
}