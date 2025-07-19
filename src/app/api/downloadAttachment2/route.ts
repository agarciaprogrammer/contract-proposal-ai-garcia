import { NextRequest, NextResponse } from "next/server";
import { fillPdf } from "@/lib/fillPdf";
import { att2Fields } from "@/lib/pdfFields";

export async function POST(req: NextRequest) {
  const { answers } = await req.json(); // { "Contractor Name": "...", ... }

  const values = Object.fromEntries(
    Object.entries(att2Fields).map(([label, field]) => [
      field,
      answers[label] ?? "",
    ])
  );

  const filled = await fillPdf(
    "http://localhost:3000/pdf/Attch_2_KTR_Release_of_Financial_Info_Form.pdf",
    values
  );

  return new NextResponse(Buffer.from(filled), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Attachment-2-Filled.pdf"`,
    },
  });
}