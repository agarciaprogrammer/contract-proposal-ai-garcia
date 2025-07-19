import { PDFDocument } from "pdf-lib";

export async function fillPdf(
  pdfUrl: string,
  values: Record<string, string>
): Promise<Uint8Array> {
  const bytes = await fetch(pdfUrl).then((r) => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(bytes);
  const form = pdfDoc.getForm();

  for (const [label, value] of Object.entries(values)) {
    const field = form.getTextField(label);
    if (field) field.setText(value);
  }
  form.flatten(); // make fields non-editable
  return pdfDoc.save();
}