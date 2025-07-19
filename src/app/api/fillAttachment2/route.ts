import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";
import { loadEntity } from "@/lib/data";
import { att2Fields } from "@/lib/pdfFields";
import { generateFormAnswers } from "@/lib/formFiller";
import { loadAllContracts } from "@/lib/data";

export async function POST(req: NextRequest) {
  const { answers, contractId } = await req.json();
  const entity = loadEntity();
  const contract = loadAllContracts().find((c) => c.id === contractId);

  // Si no hay respuestas proporcionadas, generar sugerencias con AI
  let finalAnswers = answers || {};
  if (!answers || Object.keys(answers).length === 0) {
    const questions = Object.keys(att2Fields).map(label => ({ label, value: "" }));
    const suggestedAnswers = await generateFormAnswers(questions, entity, contract || {});
    
    finalAnswers = {};
    Object.keys(att2Fields).forEach((label, index) => {
      finalAnswers[label] = suggestedAnswers[index] || "";
    });
  }

  const html = `
    <html>
      <head><title>Attachment 2</title></head>
      <body style="font-family:system-ui;margin:40px;line-height:1.4">
        <h1>Attachment 2 – Release of Financial Information</h1>
        <table>
          ${Object.entries(att2Fields)
            .map(
              ([label]) =>
                `<tr><td><strong>${label}</strong></td><td>${finalAnswers[label] ?? ""}</td></tr>`
            )
            .join("")}
        </table>
        <p style="margin-top:40px">Signature: _______________ &nbsp;&nbsp; Title: _______________ &nbsp;&nbsp; Date: ${new Date().toLocaleDateString()}</p>
      </body>
    </html>
  `;
  const pdf = await generatePDF(html);
  return new NextResponse(Buffer.from(pdf), {
    status: 200,
    headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=Attachment-2-Filled.pdf" },
  });
}