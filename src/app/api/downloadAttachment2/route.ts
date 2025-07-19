import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";
import { loadEntity } from "@/lib/data";

export async function POST(req: NextRequest) {
  // answers = { "Contractor Name": "...", "Contractor's Financial Institution": "...", ... }
  const { answers } = await req.json();
  const entity = loadEntity();

  const html = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Attachment 2 – Release of Financial Information</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            margin: 40px;
            line-height: 1.4;
            font-size: 14px;
          }
          h1 { font-size: 18px; margin: 0 0 12px 0; }
          .field { margin-bottom: 10px; }
          .label { font-weight: 600; }
          .value {
            border-bottom: 1px solid #000;
            min-width: 200px;
            display: inline-block;
            padding: 2px 4px;
          }
          .signature {
            margin-top: 60px;
          }
        </style>
      </head>
      <body>
        <header>
          <strong>502 CONS/JBKAE &nbsp;&nbsp; JBSA LACKLAND, TX &nbsp;&nbsp; SOLICITATION FA301625Q0050 &nbsp;&nbsp; BLEACHER SEATING SYSTEMS</strong>
        </header>

        <h1>ATTACHMENT 2<br />RELEASE OF FINANCIAL INFORMATION</h1>

        <div class="field">
          <span class="label">Contractor Name:</span>
          <span class="value">${answers["Contractor Name"] ?? entity.businessName}</span>
        </div>

        <div class="field">
          <span class="label">Type of Service:</span>
          <span class="value">${answers["Type of Service"] ?? "Bleacher Seating Systems (8)"}</span>
        </div>

        <div class="field">
          <span class="label">Contractor's Financial Institution:</span>
          <span class="value">${answers["Contractor's Financial Institution"] ?? ""}</span>
        </div>

        <div class="field">
          <span class="label">Contractor's Point of Contact at Financial Institution:</span>
          <span class="value">${answers["Contractor's Point of Contact at Financial Institution"] ?? ""}</span>
        </div>

        <div class="field">
          <span class="label">Financial Institution's Phone No and e-mail:</span>
          <span class="value">${answers["Financial Institution's Phone No and e-mail"] ?? ""}</span>
        </div>

        <p style="margin-top: 40px;">
          The 502nd Contracting Squadron is evaluating <strong>${answers["Contractor Name"] ?? entity.businessName}</strong> as a prospective contractor to provide eight (8) Bleacher Seating Systems, Solicitation FA301625Q0050, in support of the 343rd Training Squadron (TRS), JBSA-Lackland, San Antonio, Texas. Prior to executing a contract award, the contracting office is required to determine the contractor's financial responsibility IAW FAR 9.104-1(a). The undersigned below gives the 502nd Contracting Squadron the permission to inquire on financial information for <strong>${answers["Contractor Name"] ?? entity.businessName}</strong>.
        </p>

        <div class="signature">
          <div class="field">
            <span class="label">Signature:</span>
            <span class="value" style="min-width: 250px;"></span>
          </div>
          <div class="field">
            <span class="label">Title:</span>
            <span class="value" style="min-width: 250px;"></span>
          </div>
          <div class="field">
            <span class="label">Date:</span>
            <span class="value">${new Date().toLocaleDateString("en-US")}</span>
          </div>
        </div>
      </body>
    </html>
  `;

  const pdf = await generatePDF(html);
  return new NextResponse(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Attachment-2-Release.pdf"`,
    },
  });
}