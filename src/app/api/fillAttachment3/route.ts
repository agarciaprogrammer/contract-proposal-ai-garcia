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
      <head>
        <title>Attachment 3</title>
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
          
          .numbered-question {
            margin-bottom: 10px;
          }
          
          .question-text {
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .answer-line {
            border-bottom: 1px solid #000;
            min-width: 400px;
            display: inline-block;
            margin-left: 5px;
          }
          
          .sub-question {
            margin-left: 20px;
            margin-bottom: 8px;
          }
          
          .sub-question-label {
            font-weight: bold;
            display: inline-block;
            min-width: 20px;
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
        
        <div class="attachment-title">ATTACHMENT 3</div>
        <div class="attachment-title">FINANCIAL INFORMATION</div>
        
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
            <span class="form-label">Contractor's Point of Contact:</span>
            <span class="form-value">${finalAnswers["Contractor's Point of Contact"] || ""}</span>
          </div>
          <div class="form-field">
            <span class="form-label">Financial Institution's Phone No. and Email:</span>
            <span class="form-value">${finalAnswers["Financial Institution's Phone No. and Email"] || ""}</span>
          </div>
        </div>
        
        <div class="numbered-question">
          <div class="question-text">1. How long has the contractor had an account with your financial institution?</div>
          <span class="answer-line">${finalAnswers["1. How long has the contractor had an account with your financial institution?"] || ""}</span>.
        </div>
        
        <div class="numbered-question">
          <div class="question-text">2. What is the contractor's current status with the financial institution? (e.g., poor, fair, good, excellent, outstanding)</div>
          <span class="answer-line">${finalAnswers["2. Current status with the financial institution"] || ""}</span>.
          <div class="sub-question">
            <span class="sub-question-label">Any additional comments?</span>
            <span class="answer-line">${finalAnswers["2a. Any additional comments?"] || ""}</span>
          </div>
        </div>
        
        <div class="numbered-question">
          <div class="question-text">3. Has the company's accounting practices been satisfactory?</div>
          <span class="answer-line">${finalAnswers["3. Have the company's accounting practices been satisfactory?"] || ""}</span>.
          <div class="sub-question">
            <span class="sub-question-label">If no, explanation:</span>
            <span class="answer-line">${finalAnswers["3a. If no, explanation"] || ""}</span>
          </div>
        </div>
        
        <div class="numbered-question">
          <div class="question-text">4. How many accounts and what types of accounts does the company have with the institution?</div>
          <span class="answer-line">${finalAnswers["4. How many accounts and what types of accounts does the company have?"] || ""}</span>
          <div class="sub-question">
            <span class="sub-question-label">a.</span>
            <span class="answer-line">${finalAnswers["4a. Account type / amount"] || ""}</span>
          </div>
          <div class="sub-question">
            <span class="sub-question-label">b.</span>
            <span class="answer-line">${finalAnswers["4b. Account type / amount"] || ""}</span>
          </div>
          <div class="sub-question">
            <span class="sub-question-label">c.</span>
            <span class="answer-line">${finalAnswers["4c. Account type / amount"] || ""}</span>
          </div>
        </div>
        
        <div class="numbered-question">
          <div class="question-text">5. What is the company's current operational balance? (e.g., low, moderate, or high--five, six figure, etc.)</div>
          <span class="answer-line">${finalAnswers["5. Current operational balance"] || ""}</span>.
        </div>
        
        <div class="numbered-question">
          <div class="question-text">6. Does the contractor have a line of credit? (e.g., low, moderate, or high--five, six figure, etc.)</div>
          <span class="answer-line">${finalAnswers["6. Does the contractor have a line of credit?"] || ""}</span>.
        </div>
        
        <div class="numbered-question">
          <div class="question-text">7. Based on the contractor's financial history, current status, and the magnitude of this project (six figure), how do you feel the contractor will be able to perform his financial obligation?</div>
          <span class="answer-line">${finalAnswers["7. Financial obligation performance assessment"] || ""}</span>
        </div>
        
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
    headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=Attachment-3-Filled.pdf" },
  });
}