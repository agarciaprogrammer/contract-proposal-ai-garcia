"use client";
interface Props {
  value: string;
  onChange: (val: string) => void;
  type: "heading_1" | "paragraph" | "bulleted_list_item";
}
export default function EditBlock({ value, onChange, type }: Props) {
  if (type === "heading_1") {
    return (
      <div className="mb-6">
        <label className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wide">
          Heading
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full text-2xl font-bold border-2 border-slate-200 rounded-lg p-4 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
          placeholder="Enter heading text..."
        />
      </div>
    );
  }

  if (type === "bulleted_list_item") {
    return (
      <div className="mb-4">
        <label className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wide">
          List Item
        </label>
        <div className="flex items-start gap-3">
          <span className="text-slate-400 mt-3 text-lg">•</span>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 border-2 border-slate-200 rounded-lg p-3 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 resize-none"
            rows={2}
            placeholder="Enter list item text..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <label className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wide">
        Paragraph
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border-2 border-slate-200 rounded-lg p-4 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 resize-none text-base leading-relaxed"
        rows={6}
        placeholder="Enter paragraph text..."
      />
    </div>
  );
}