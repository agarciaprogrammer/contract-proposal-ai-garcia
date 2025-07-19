import { loadEntity, loadCapabilityStatement } from "@/lib/data";

type Naics = { code: string; name: string };

export default function CompanyPage() {
  const entity = loadEntity();
  const cap = loadCapabilityStatement();

  return (
    <main className="p-8 max-w-4xl fade-in">
      <div className="card p-8 mb-8 slide-up">
        <h1 className="text-4xl font-bold mb-4">{entity.businessName}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <p><strong>UEI:</strong> {entity.ueiCode}</p>
          <p><strong>CAGE:</strong> {entity.cageCode}</p>
          <p><strong>HQ:</strong> {entity.physicalAddress}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={entity.website} target="_blank" rel="noreferrer" className="underline hover:text-[var(--accent)] transition-colors duration-200">
              {entity.website}
            </a>
          </p>
        </div>
      </div>
      <div className="card p-6 mb-8 slide-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
        <h2 className="text-2xl font-semibold mb-2">Códigos NAICS</h2>
        <ul className="list-disc list-inside mb-4 text-[var(--secondary)]">
          {entity.naicsCodes.map((n: { code: string; name: string }) => (
            <li key={n.code}>{n.code} – {n.name}</li>
          ))}
        </ul>
      </div>
      <div className="card p-6 mb-8 slide-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
        <h2 className="text-2xl font-semibold mb-2">Declaración de Capacidades</h2>
        <p className="whitespace-pre-wrap text-[var(--foreground)]">{cap.summary}</p>
      </div>
      <div className="card p-6 slide-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
        <h3 className="text-xl font-semibold mb-2">Deal Makers / Breakers</h3>
        <p className="mb-2"><strong>Preferencias:</strong> {entity.dealMakers}</p>
        <p><strong>Exclusiones:</strong> {entity.dealBreakers}</p>
      </div>
    </main>
  );
}