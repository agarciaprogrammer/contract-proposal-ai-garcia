"use client";
interface Props {
  value: string;
  onChange: (val: string) => void;
  type: "heading_1" | "paragraph" | "bulleted_list_item";
}
export default function EditBlock({ value, onChange, type }: Props) {
  if (type === "heading_1") {
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full text-xl font-bold border-b border-slate-300 p-1"
      />
    );
  }
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full border border-slate-300 rounded p-2 text-sm"
      rows={type === "bulleted_list_item" ? 1 : 3}
    />
  );
}