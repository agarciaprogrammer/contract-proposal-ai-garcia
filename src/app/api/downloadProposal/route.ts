import { NextRequest, NextResponse } from "next/server";
import { loadAllContracts } from "@/lib/data";
import { loadEntity } from "@/lib/data";
import { proposalChain} from "@/lib/ai";
import type { Block } from "@/lib/ai";
import { generatePDF } from "@/lib/pdf";

export async function POST(req: NextRequest) {
  const { contractId } = await req.json();
  const contract = loadAllContracts().find((c) => c.id === contractId);
  if (!contract) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entity = loadEntity();
  const { blocks } = await proposalChain.invoke({ contract, entity });

  // Build minimal HTML
  const html = `
    <html>
      <head>
        <title>Proposal ${contract.solicitationNumber}</title>
        <style>
          body { font-family: system-ui, sans-serif; margin: 40px; }
          h1 { font-size: 24px; margin-bottom: 16px; }
          p  { margin-bottom: 12px; line-height: 1.4; }
          ul { margin: 0; padding-left: 20px; }
        </style>
      </head>
      <body>
        ${blocks
          .map((b: Block) => {
            switch (b.type) {
              case "heading_1":
                return `<h1>${b.text}</h1>`;
              case "paragraph":
                return `<p>${b.text}</p>`;
              case "bulleted_list_item":
                return `<li>${b.text}</li>`;
              default:
                return "";
            }
          })
          .join("")}
      </body>
    </html>
  `;

  const pdf = await generatePDF(html);

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="proposal-${contract.solicitationNumber}.pdf"`,
    },
  });
}