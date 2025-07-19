import { NextRequest, NextResponse } from "next/server";
import { fillPdf } from "@/lib/fillPdf";
import { att3Fields } from "@/lib/pdfFields";

export async function POST(req: NextRequest) {
  const { answers } = await req.json();

  const values = Object.fromEntries(
    Object.entries(att3Fields).map(([label, field]) => [
      field,
      answers[label] ?? "",
    ])
  );

  const filled = await fillPdf(
    "http://localhost:3000/pdf/Attch_3_Financial_Info_Questionnaire_Form.pdf",
    values
  );

  return new NextResponse(Buffer.from(filled), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Attachment-3-Filled.pdf"`,
    },
  });
}