"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { att3Fields } from "@/lib/pdfFields";

function Attachment3Page() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(Object.keys(att3Fields).map((k) => [k, ""]))
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [contractId, setContractId] = useState("");

  // Extraer contractId de los parámetros de consulta
  useEffect(() => {
    const urlContractId = searchParams.get("contractId");
    if (urlContractId) {
      setContractId(urlContractId);
    }
  }, [searchParams]);

  const generateSuggestions = async () => {
    if (!contractId) {
      alert("Please enter the contract ID");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/generateAttachment3Suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractId }),
      });
      
      if (!res.ok) {
        throw new Error("Error generating suggestions");
      }
      
      const data = await res.json();
      setValues(data.suggestions);
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating AI suggestions");
    } finally {
      setIsGenerating(false);
    }
  };

  const download = async () => {
    const res = await fetch("/api/fillAttachment3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: values, contractId }),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Attachment-3-Filled.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Attachment 3 – Financial Information Questionnaire</h1>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <label className="block mb-2">
          <span className="font-semibold">Contract ID:</span>
          <input
            type="text"
            className="mt-1 block w-full border border-slate-300 rounded px-2 py-1 bg-gray-100"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            placeholder="Extracted automatically from the URL"
            readOnly={!!searchParams.get("contractId")}
          />
        </label>
        <button
          onClick={generateSuggestions}
          disabled={isGenerating || !contractId}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Generate Suggestions with AI"}
        </button>
      </div>

      {Object.entries(att3Fields).map(([label]) => (
        <label key={label} className="block mb-4">
          <span className="font-semibold">{label}</span>
          <input
            className="mt-1 block w-full border border-slate-300 rounded px-2 py-1"
            value={values[label]}
            onChange={(e) => setValues({ ...values, [label]: e.target.value })}
            placeholder="Edit the suggested answer by AI"
          />
        </label>
      ))}
      
      <button
        onClick={download}
        className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        📄 Download Attachment 3
      </button>
    </main>
  );
}

export default function Attachment3PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Attachment3Page />
    </Suspense>
  );
}