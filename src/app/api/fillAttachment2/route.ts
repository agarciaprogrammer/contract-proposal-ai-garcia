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
      <head>
        <title>Attachment 2</title>
        <style>
          @page {
            margin: 1in;
            size: letter;
          }
          
          body {
            font-family: "Times New Roman", serif;
            font-size: 12pt;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            color: #000;
          }
          
          .header {
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
          }
          
          .header-main {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .header-sub {
            font-size: 12pt;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .solicitation-info {
            text-align: center;
            font-size: 12pt;
            font-weight: bold;
            margin-bottom: 15px;
          }
          
          .attachment-title {
            text-align: center;
            font-size: 14pt;
            font-weight: bold;
            margin: 20px 0 15px 0;
            text-transform: uppercase;
          }
          
          .form-section {
            margin-bottom: 20px;
          }
          
          .form-field {
            margin-bottom: 8px;
            display: flex;
            align-items: baseline;
          }
          
          .form-label {
            font-weight: bold;
            min-width: 200px;
            display: inline-block;
          }
          
          .form-value {
            border-bottom: 1px solid #000;
            min-width: 300px;
            display: inline-block;
            padding-left: 5px;
          }
          
          .signature-section {
            margin-top: 30px;
          }
          
          .signature-line {
            border-bottom: 1px solid #000;
            min-width: 300px;
            display: inline-block;
            margin-left: 10px;
          }
          
          .signature-field {
            margin-bottom: 15px;
          }
          
          .signature-label {
            font-weight: bold;
            display: inline-block;
            min-width: 80px;
          }
          
          p {
            margin-bottom: 8px;
            text-align: justify;
          }
          
          .answer-line {
            border-bottom: 1px solid #000;
            min-width: 400px;
            display: inline-block;
            margin-left: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-main">502 CONS/JBKAE</div>
          <div class="header-sub">JBSA LACKLAND, TX</div>
        </div>
        
        <div class="solicitation-info">
          <div>SOLICITATION FA301625Q0050</div>
          <div>BLEACHER SEATING SYSTEMS</div>
        </div>
        
        <div class="attachment-title">ATTACHMENT 2</div>
        <div class="attachment-title">RELEASE OF FINANCIAL INFORMATION</div>
        
        <div class="form-section">
          <div class="form-field">
            <span class="form-label">Contractor Name:</span>
            <span class="form-value">${finalAnswers["Contractor Name"] || ""}</span>
          </div>
          <div class="form-field">
            <span class="form-label">Type of Service:</span>
            <span class="form-value">${finalAnswers["Type of Service"] || ""}</span>
          </div>
          <div class="form-field">
            <span class="form-label">Contractor's Financial Institution:</span>
            <span class="form-value">${finalAnswers["Contractor's Financial Institution"] || ""}</span>
          </div>
          <div class="form-field">
            <span class="form-label">Contractor's Point of Contact at Financial Institution:</span>
            <span class="form-value">${finalAnswers["Contractor's Point of Contact at Financial Institution"] || ""}</span>
          </div>
          <div class="form-field">
            <span class="form-label">Financial Institution's Phone No and e-mail:</span>
            <span class="form-value">${finalAnswers["Financial Institution's Phone No and e-mail"] || ""}</span>
          </div>
        </div>
        
        <p>The 502nd Contracting Squadron is evaluating <span class="answer-line">${finalAnswers["Contractor Name"] || ""}</span> as a prospective contractor to provide eight (8) Bleacher Seating Systems, Solicitation FA301625Q0050, in support of the 343rd Training Squadron (TRS), JBSA-Lackland, San Antonio, Texas. Prior to executing a contract award, the contracting office is required to determine the contractor's financial responsibility IAW FAR 9.104-1(a). The undersigned below gives the 502nd Contracting Squadron the permission to inquire on financial information for <span class="answer-line">${finalAnswers["Contractor Name"] || ""}</span>.</p>
        
        <div class="signature-section">
          <div class="signature-field">
            <span class="signature-label">Signature:</span>
            <span class="signature-line"></span>
          </div>
          <div class="signature-field">
            <span class="signature-label">Title:</span>
            <span class="signature-line"></span>
          </div>
          <div class="signature-field">
            <span class="signature-label">Date:</span>
            <span class="signature-line"></span>
          </div>
        </div>
      </body>
    </html>
  `;
  const pdf = await generatePDF(html);
  return new NextResponse(Buffer.from(pdf), {
    status: 200,
    headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=Attachment-2-Filled.pdf" },
  });
}