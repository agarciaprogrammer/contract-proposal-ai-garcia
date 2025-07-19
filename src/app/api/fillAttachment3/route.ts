import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";
import { loadEntity } from "@/lib/data";
import { att3Fields } from "@/lib/pdfFields";
import { generateFormAnswers } from "@/lib/formFiller";
import { loadAllContracts } from "@/lib/data";

export async function POST(req: NextRequest) {
  const { answers, contractId } = await req.json();
  const entity = loadEntity();
  const contract = loadAllContracts().find((c) => c.id === contractId);

  // Si no hay respuestas proporcionadas, generar sugerencias con AI
  let finalAnswers = answers || {};
  if (!answers || Object.keys(answers).length === 0) {
    const questions = Object.keys(att3Fields).map(label => ({ label, value: "" }));
    const suggestedAnswers = await generateFormAnswers(questions, entity, contract || {});
    
    finalAnswers = {};
    Object.keys(att3Fields).forEach((label, index) => {
      finalAnswers[label] = suggestedAnswers[index] || "";
    });
  }

  const html = `
    <html>
      <head><title>Attachment 3</title></head>
      <body style="font-family:system-ui;margin:40px;line-height:1.4">
        <h1>Attachment 3 – Financial Information Questionnaire</h1>
        <ol>
          ${Object.entries(att3Fields)
            .map(
              ([label]) =>
                `<li><strong>${label}</strong>: ${finalAnswers[label] ?? ""}</li>`
            )
            .join("")}
        </ol>
        <p style="margin-top:40px">Signature: _______________ &nbsp;&nbsp; Title: _______________ &nbsp;&nbsp; Date: ${new Date().toLocaleDateString()}</p>
      </body>
    </html>
  `;
  const pdf = await generatePDF(html);
  return new NextResponse(Buffer.from(pdf), {
    status: 200,
    headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=Attachment-3-Filled.pdf" },
  });
}