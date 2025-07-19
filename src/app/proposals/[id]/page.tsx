"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Block, FormBlock } from "@/lib/ai";
import FormBlockComponent from "@/components/FormBlock";

interface ProposalRes {
  blocks: Block[];
}

export default function ProposalPage() {
  const { id } = useParams() as { id: string };
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/generateProposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contractId: id }),
    })
      .then((r) => r.json())
      .then((res: ProposalRes) => setBlocks(res.blocks))
      .finally(() => setLoading(false));
  }, [id]);

  const updateForm = (idx: number, questions: FormBlock["questions"]) => {
    const next = [...blocks];
    (next[idx] as FormBlock).questions = questions;
    setBlocks(next);
  };

  if (loading) return <p className="p-8 text-center">Generating proposal…</p>;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Proposal</h1>
      <div className="prose prose-slate max-w-none">
        {blocks.map((b, i) => {
          switch (b.type) {
            case "heading_1":
              return <h2 key={i}>{b.text}</h2>;
            case "paragraph":
              return <p key={i}>{b.text}</p>;
            case "bulleted_list_item":
              return <li key={i}>{b.text}</li>;
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
    </main>
  );
}