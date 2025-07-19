"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Block, FormBlock } from "@/lib/ai";
import FormBlockComponent from "@/components/FormBlock";
import EditBlock from "@/components/EditBlock";

export default function ProposalPage() {
  const { id } = useParams() as { id: string };
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Load from API or localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`draft-${id}`);
    if (saved) {
      setBlocks(JSON.parse(saved));
      setLoading(false);
    } else {
      fetch("/api/generateProposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractId: id }),
      })
        .then((r) => r.json())
        .then((res) => {
          setBlocks(res.blocks);
          localStorage.setItem(`draft-${id}`, JSON.stringify(res.blocks));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateBlock = (idx: number, value: string) => {
    const next = [...blocks];
    const block = next[idx];
    if (block.type !== "form" && "text" in block) {
      block.text = value;
    }
    setBlocks(next);
  };

  const updateForm = (idx: number, questions: FormBlock["questions"]) => {
    const next = [...blocks];
    (next[idx] as FormBlock).questions = questions;
    setBlocks(next);
  };

  const saveDraft = () => {
    localStorage.setItem(`draft-${id}`, JSON.stringify(blocks));
    setEditMode(false);
  };

  if (loading) return <p className="p-8 text-center">Loading proposal…</p>;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Proposal</h1>
        <button
          onClick={() => (editMode ? saveDraft() : setEditMode(true))}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
        >
          {editMode ? "Save Draft" : "Edit"}
        </button>
      </div>

      <div className="prose prose-slate max-w-none">
        {blocks.map((b, i) => {
          switch (b.type) {
            case "heading_1":
            case "paragraph":
            case "bulleted_list_item":
              return editMode ? (
                <EditBlock
                  key={i}
                  value={b.text}
                  type={b.type}
                  onChange={(val) => updateBlock(i, val)}
                />
              ) : (
                <div key={i} className="whitespace-pre-wrap">
                  {b.type === "heading_1" ? <h2>{b.text}</h2> : <p>{b.text}</p>}
                </div>
              );

            case "form":
              return (
                <FormBlockComponent
                  key={i}
                  block={b}
                  onChange={(qs) => updateForm(i, qs)}
                />
              );

            default:
              return null;
          }
        })}
      </div>
        <button
          onClick={async () => {
            const res = await fetch("/api/downloadProposal", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ blocks }),
            });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `proposal-${id}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="mt-8 inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          📄 Download Edited Proposal
        </button>
    </main>
  );
}