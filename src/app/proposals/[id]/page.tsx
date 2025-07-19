"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Block } from "@/lib/ai";
import EditBlock from "@/components/EditBlock";
import Link from "next/link";

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
        cache: "no-store",
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

  // const updateForm = (idx: number, questions: FormBlock["questions"]) => {
  //   const next = [...blocks];
  //   (next[idx] as FormBlock).questions = questions;
  //   setBlocks(next);
  // };

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

      <div className={editMode ? "bg-slate-50 rounded-xl p-6 border border-slate-200" : "prose prose-slate max-w-none prose-p:text-justify prose-p:leading-relaxed prose-p:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:text-slate-800"}>
        {editMode && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">✏️ Edit Mode Active</h3>
            <p className="text-sm text-blue-700">You can now edit each section below. Click &quot;Save Draft&quot; when you&apos;re done.</p>
          </div>
        )}
        
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
                <div key={i} className="mb-4">
                  {b.type === "heading_1" ? (
                    <h2 className="text-2xl font-bold mb-4 text-slate-800 border-b border-slate-200 pb-2">
                      {b.text}
                    </h2>
                  ) : b.type === "bulleted_list_item" ? (
                    <p className="text-justify leading-relaxed mb-2 flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{b.text}</span>
                    </p>
                  ) : (
                    <p className="text-justify leading-relaxed mb-4">
                      {b.text}
                    </p>
                  )}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-4">
        {/* Primary Action - Download */}
        <div className="flex justify-center">
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
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Proposal PDF
          </button>
        </div>

        {/* Secondary Actions - Edit Attachments */}
        <div className="flex justify-center gap-4">
          <Link 
            href={`/attachments/2?contractId=${id}`} 
            className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-200 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Attachment 2 – Release of Financial Information
          </Link>
          <Link 
            href={`/attachments/3?contractId=${id}`} 
            className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-200 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Attachment 3 – Financial Information Questionnaire
          </Link>
        </div>
      </div>
    </main>
  );
}