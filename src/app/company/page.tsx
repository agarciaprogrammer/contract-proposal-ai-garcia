import { loadEntity, loadCapabilityStatement } from "@/lib/data";

type NaicsCode = { code: string; name: string };

export default function CompanyPage() {
  const entity = loadEntity();
  const cap = loadCapabilityStatement();

  return (
    <main className="p-8 max-w-4xl fade-in">
      <div className="card p-8 slide-up">
        <h1 className="text-4xl font-bold mb-6">{entity.businessName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <p className="text-[var(--secondary)]">
              <strong>UEI:</strong> {entity.ueiCode}
            </p>
            <p className="text-[var(--secondary)]">
              <strong>CAGE:</strong> {entity.cageCode}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[var(--secondary)]">
              <strong>HQ:</strong> {entity.physicalAddress}
            </p>
            <p className="text-[var(--secondary)]">
              <strong>Website:</strong>{" "}
              <a href={entity.website} target="_blank" rel="noreferrer" className="text-[var(--accent)] underline hover:text-[var(--secondary)] transition-colors">
                {entity.website}
              </a>
            </p>
          </div>
        </div>

        <div className="mb-8 slide-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">NAICS Codes</h2>
          <div className="bg-[var(--muted)] rounded-[var(--radius)] p-4">
            <ul className="space-y-2">
              {(entity.naicsCodes as NaicsCode[]).map((n) => (
                <li key={n.code} className="flex items-start gap-3">
                  <span className="text-[var(--accent)] font-semibold min-w-[80px]">{n.code}</span>
                  <span className="text-[var(--foreground)]">{n.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8 slide-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Capability Statement</h2>
          <div className="bg-[var(--muted)] rounded-[var(--radius)] p-4">
            <p className="whitespace-pre-wrap text-[var(--foreground)] leading-relaxed">{cap.summary}</p>
          </div>
        </div>

        <div className="slide-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
          <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">Deal Makers / Breakers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--muted)] rounded-[var(--radius)] p-4">
              <h4 className="font-semibold text-[var(--accent)] mb-2">Preferences</h4>
              <p className="text-[var(--foreground)]">{entity.dealMakers}</p>
            </div>
            <div className="bg-[var(--muted)] rounded-[var(--radius)] p-4">
              <h4 className="font-semibold text-[var(--accent)] mb-2">Exclusions</h4>
              <p className="text-[var(--foreground)]">{entity.dealBreakers}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}