import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";
import { loadEntity } from "@/lib/data";

export async function POST(req: NextRequest) {
  const { answers } = await req.json();
  const entity = loadEntity();

  const html = `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Attachment 3 – Financial Information Questionnaire</title>
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
        </style>
      </head>
      <body>
        <header>
          <strong>502 CONS/JBKAE &nbsp;&nbsp; JBSA LACKLAND, TX &nbsp;&nbsp; SOLICITATION FA301625Q0050 &nbsp;&nbsp; BLEACHER SEATING SYSTEMS</strong>
        </header>

        <h1>ATTACHMENT 3<br />FINANCIAL INFORMATION</h1>

        <div class="field"><span class="label">Contractor Name:</span> <span class="value">${answers["Contractor Name"] ?? entity.businessName}</span></div>
        <div class="field"><span class="label">Type of Service:</span> <span class="value">${answers["Type of Service"] ?? "Bleacher Seating Systems"}</span></div>
        <div class="field"><span class="label">Contractor's Financial Institution:</span> <span class="value">${answers["Contractor's Financial Institution"] ?? ""}</span></div>
        <div class="field"><span class="label">Contractor's Point of Contact:</span> <span class="value">${answers["Contractor's Point of Contact"] ?? ""}</span></div>
        <div class="field"><span class="label">Financial Institution's Phone No. and Email:</span> <span class="value">${answers["Financial Institution's Phone No. and Email"] ?? ""}</span></div>

        <ol style="margin: 20px 0 0 20px;">
          <li>How long has the contractor had an account with your financial institution? <span class="value">${answers["1. How long has the contractor had an account with your financial institution?"] ?? ""}</span></li>
          <li>What is the contractor's current status with the financial institution? <span class="value">${answers["2. What is the contractor's current status with the financial institution?"] ?? ""}</span></li>
          <li>Any additional comments? <span class="value">${answers["2a. Any additional comments?"] ?? ""}</span></li>
          <li>Has the company's accounting practices been satisfactory? <span class="value">${answers["3. Has the company's accounting practices been satisfactory?"] ?? ""}</span></li>
          <li>If no, please provide an explanation why. <span class="value">${answers["3a. If no, explanation"] ?? ""}</span></li>
          <li>How many accounts and what types of accounts does the company have with the institution? <span class="value">${answers["4. How many accounts and what types of accounts does the company have with the institution?"] ?? ""}</span></li>
          <li>a. <span class="value">${answers["4a. Account type / amount"] ?? ""}</span></li>
          <li>b. <span class="value">${answers["4b. Account type / amount"] ?? ""}</span></li>
          <li>c. <span class="value">${answers["4c. Account type / amount"] ?? ""}</span></li>
          <li>What is the company's current operational balance? <span class="value">${answers["5. What is the company's current operational balance?"] ?? ""}</span></li>
          <li>Does the contractor have a line of credit? <span class="value">${answers["6. Does the contractor have a line of credit?"] ?? ""}</span></li>
          <li>Based on the contractor's financial history, current status, and the magnitude of this project (six figure), how do you feel the contractor will be able to perform his financial obligation? <span class="value">${answers["7. Financial obligation performance assessment"] ?? ""}</span></li>
        </ol>

        <div style="margin-top: 40px;">
          <div class="field">Signature: <span class="value" style="min-width: 250px;"></span></div>
          <div class="field">Title: <span class="value" style="min-width: 250px;"></span></div>
          <div class="field">Date: <span class="value">${new Date().toLocaleDateString("en-US")}</span></div>
        </div>
      </body>
    </html>
  `;

  const pdf = await generatePDF(html);
  return new NextResponse(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Attachment-3-Financial.pdf"`,
    },
  });
}