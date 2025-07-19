// src/app/api/downloadProposal/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";
import type { Block } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { blocks } = await req.json(); // edited blocks
  const html = `
    <html>
      <head>
        <title>Proposal</title>
        <style>
          body{font-family:system-ui;margin:40px}
          h1{font-size:24px;margin-bottom:8px}
          p,li{margin-bottom:6px;line-height:1.4}
          ul{padding-left:20px}
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
              case "form":
                return `<h3>${b.title}</h3>
                        <table border="0" cellpadding="4">
                          ${b.questions
                            .map(
                              (q) =>
                                `<tr><td><strong>${q.label}</strong></td><td>${q.value}</td></tr>`
                            )
                            .join("")}
                        </table>`;
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
      "Content-Disposition": `attachment; filename="proposal.pdf"`,
    },
  });
}