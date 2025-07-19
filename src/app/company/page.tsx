import { loadEntity, loadCapabilityStatement } from "@/lib/data";

type Naics = { code: string; name: string };

export default function CompanyPage() {
  const entity = loadEntity();
  const cap = loadCapabilityStatement();

  return (
    <main className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{entity.businessName}</h1>
      <p className="mb-1"><strong>UEI:</strong> {entity.ueiCode}</p>
      <p className="mb-1"><strong>CAGE:</strong> {entity.cageCode}</p>
      <p className="mb-1">
        <strong>HQ:</strong> {entity.physicalAddress}
      </p>
      <p className="mb-1">
        <strong>Website:</strong>{" "}
        <a href={entity.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          {entity.website}
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">NAICS Codes</h2>
      <ul className="list-disc list-inside mb-6">
        {entity.naicsCodes.map((n: Naics) => (
          <li key={n.code}>{n.code} – {n.name}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Capability Statement</h2>
      <p className="whitespace-pre-wrap">{cap.summary}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Deal Makers / Breakers</h3>
      <p className="mb-2"><strong>Preferences:</strong> {entity.dealMakers}</p>
      <p><strong>Exclusions:</strong> {entity.dealBreakers}</p>
    </main>
  );
}