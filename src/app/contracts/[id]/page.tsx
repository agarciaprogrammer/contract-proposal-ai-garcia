export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { loadAllContracts, loadEntity } from "@/lib/data";
import Link from "next/link";

// Next.js 15 signature
interface Props {
  params: Promise<{ id: string }>;
}

export default async function ContractDetail({ params }: Props) {
  const { id } = await params;
  const contract = loadAllContracts().find((c) => c.id === id);
  if (!contract) notFound();

  const entity = loadEntity();
  // Llamar a la API route para obtener el alignment
  let alignment = 0;
  let explanation = "";
  try {
    const res = await fetch(
      "/api/contractAlignment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entity, contract }),
        cache: "no-store"
      }
    );
    if (res.ok) {
      const data = await res.json();
      alignment = data.alignment;
      explanation = data.explanation;
    } else {
      explanation = "Could not calculate alignment percentage.";
    }
  } catch {
    alignment = 0;
    explanation = "Could not calculate alignment percentage.";
  }

  return (
    <main className="p-8 max-w-4xl fade-in">
      <div className="card p-8 slide-up relative">
        {/* Porcentaje de alineación arriba a la derecha */}
        <div className="absolute top-6 right-8 flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500">Alignment</span>
            <span className="text-2xl font-bold text-green-600">{alignment}%</span>
          </div>
          <span className="text-xs text-gray-500 max-w-xs text-right">{explanation}</span>
        </div>
        <h1 className="text-4xl font-bold mb-2">{contract.title}</h1>
        <p className="text-[var(--secondary)] mb-1">
          <strong>Solicitation #:</strong> {contract.solicitationNumber}
        </p>
        <p className="text-[var(--secondary)] mb-1">
          <strong>Agency:</strong> {contract.agencyName}
        </p>
        <p className="text-[var(--secondary)] mb-1">
          <strong>NAICS:</strong> {contract.naicsCode} – {contract.naicsName}
        </p>
        <p className="text-[var(--accent)] mb-4">
          <strong>Response due:</strong> {new Date(contract.deadlineDate).toLocaleString()}
        </p>
        <div className="prose prose-sm max-w-none text-[var(--foreground)] mb-4 prose-h3:text-[var(--primary)] prose-p:text-justify">
          {(() => {
            const processedText = contract.description
              // First, handle HTML if present
              .replace(/<br\s*\/?>/gi, '\n')
              .replace(/<p[^>]*>/gi, '')
              .replace(/<\/p>/gi, '\n')
              .replace(/&nbsp;/g, ' ')
              // Then handle literal \n characters
              .replace(/\\n/g, '\n');
            
            // Split into lines and process them
            const lines = processedText.split('\n').map((line: string) => line.trim()).filter((line: string) => line);
            
            // Group lines into paragraphs
            const paragraphs: string[] = [];
            let currentParagraph = '';
            
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              
              // Check if this line should start a new paragraph
              const shouldStartNewParagraph = 
                line.startsWith('Attachment') ||
                line === line.toUpperCase() ||
                /^\d+\./.test(line) ||
                line.startsWith('•') ||
                line.startsWith('-') ||
                // If previous line ends with a period and this line starts with uppercase
                (currentParagraph.endsWith('.') && /^[A-Z]/.test(line)) ||
                // If this is a standalone short line that looks like a heading
                (line.length < 50 && /^[A-Z][^.!?]*$/.test(line));
              
              if (shouldStartNewParagraph && currentParagraph) {
                paragraphs.push(currentParagraph.trim());
                currentParagraph = line;
              } else {
                // Join lines that should be in the same paragraph
                if (currentParagraph) {
                  currentParagraph += ' ' + line;
                } else {
                  currentParagraph = line;
                }
              }
            }
            
            // Add the last paragraph
            if (currentParagraph) {
              paragraphs.push(currentParagraph.trim());
            }
            
            return paragraphs.map((paragraph: string, index: number) => {
              // Check if it's a list item
              if (/^\d+\./.test(paragraph) || paragraph.startsWith('•') || paragraph.startsWith('-')) {
                return (
                  <li key={index} className="mb-2">
                    {paragraph.replace(/^[\d•\-\.\s]+/, '').trim()}
                  </li>
                );
              }
              
              // Check if it's a heading
              if (paragraph === paragraph.toUpperCase() || paragraph.startsWith('Attachment')) {
                return (
                  <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-[var(--primary)]">
                    {paragraph}
                  </h3>
                );
              }
              
              // Regular paragraph
              return (
                <p key={index} className="mb-3 leading-relaxed text-justify">
                  {paragraph}
                </p>
              );
            });
          })()}
        </div>
        <Link
          href={`/proposals/${contract.id}`}
          className="mt-6 inline-block btn-secondary px-6 py-2 text-base font-medium shadow slide-up"
          style={{animationDelay: '0.1s', animationFillMode: 'both'}}
        >
          Generate Proposal
        </Link>
      </div>
    </main>
  );
}