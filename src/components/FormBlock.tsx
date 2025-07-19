"use client";
import { FormBlock } from "@/lib/ai";

interface Props {
  block: FormBlock;
  onChange: (questions: FormBlock["questions"]) => void;
}

export default function FormBlockComponent({ block, onChange }: Props) {
  return (
    <div className="border border-slate-300 rounded-md p-4 my-4">
      <h3 className="font-semibold mb-3">{block.title}</h3>
      {block.questions.map((q, i) => (
        <label key={i} className="block mb-2 text-sm">
          <span className="text-slate-700">{q.label}</span>
          <input
            type="text"
            value={q.value}
            className="mt-1 block w-full rounded border border-slate-300 px-2 py-1"
            onChange={(e) => {
              const updated = [...block.questions];
              updated[i] = { ...q, value: e.target.value };
              onChange(updated);
            }}
          />
        </label>
      ))}
    </div>
  );
}