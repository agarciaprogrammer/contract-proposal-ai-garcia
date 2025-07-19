// src/app/api/downloadProposal/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";
import type { Block, FormBlock } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { blocks } = await req.json(); // edited blocks
  
  const html = `
    <html>
      <head>
        <title>Proposal</title>
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
          
          .form-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          
          .form-table td {
            padding: 4px 8px;
            vertical-align: top;
            border: none;
          }
          
          .form-table td:first-child {
            font-weight: bold;
            width: 200px;
          }
          
          .form-table td:last-child {
            border-bottom: 1px solid #000;
            min-width: 300px;
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
          
          h1 {
            font-size: 16pt;
            font-weight: bold;
            margin: 20px 0 10px 0;
            text-align: center;
          }
          
          h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 15px 0 8px 0;
          }
          
          h3 {
            font-size: 12pt;
            font-weight: bold;
            margin: 12px 0 6px 0;
          }
          
          p {
            margin-bottom: 8px;
            text-align: justify;
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
        ${blocks
          .map((b: Block) => {
            switch (b.type) {
              case "heading_1":
                return `<h1>${b.text}</h1>`;
              case "paragraph":
                return `<p>${b.text}</p>`;
              case "bulleted_list_item":
                return `<p>• ${b.text}</p>`;
              case "form":
                if (b.title.includes("Attachment 2")) {
                  return generateAttachment2HTML(b);
                } else if (b.title.includes("Attachment 3")) {
                  return generateAttachment3HTML(b);
                } else {
                  return `<h3>${b.title}</h3>
                          <table class="form-table">
                            ${b.questions
                              .map(
                                (q) =>
                                  `<tr><td>${q.label}</td><td>${q.value}</td></tr>`
                              )
                              .join("")}
                          </table>`;
                }
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

function generateAttachment2HTML(formBlock: FormBlock) {
  const questions = formBlock.questions;
  const contractorName = questions.find((q) => q.label === "Contractor Name")?.value || "";
  const typeOfService = questions.find((q) => q.label === "Type of Service")?.value || "";
  const financialInstitution = questions.find((q) => q.label === "Contractor's Financial Institution")?.value || "";
  const pointOfContact = questions.find((q) => q.label === "Contractor's Point of Contact at Financial Institution")?.value || "";
  const phoneEmail = questions.find((q) => q.label === "Financial Institution's Phone No and e-mail")?.value || "";

  return `
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
        <span class="form-value">${contractorName}</span>
      </div>
      <div class="form-field">
        <span class="form-label">Type of Service:</span>
        <span class="form-value">${typeOfService}</span>
      </div>
      <div class="form-field">
        <span class="form-label">Contractor's Financial Institution:</span>
        <span class="form-value">${financialInstitution}</span>
      </div>
      <div class="form-field">
        <span class="form-label">Contractor's Point of Contact at Financial Institution:</span>
        <span class="form-value">${pointOfContact}</span>
      </div>
      <div class="form-field">
        <span class="form-label">Financial Institution's Phone No and e-mail:</span>
        <span class="form-value">${phoneEmail}</span>
      </div>
    </div>
    
    <p>The 502nd Contracting Squadron is evaluating <span class="answer-line">${contractorName}</span> as a prospective contractor to provide eight (8) Bleacher Seating Systems, Solicitation FA301625Q0050, in support of the 343rd Training Squadron (TRS), JBSA-Lackland, San Antonio, Texas. Prior to executing a contract award, the contracting office is required to determine the contractor's financial responsibility IAW FAR 9.104-1(a). The undersigned below gives the 502nd Contracting Squadron the permission to inquire on financial information for <span class="answer-line">${contractorName}</span>.</p>
    
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
  `;
}

function generateAttachment3HTML(formBlock: FormBlock) {
  const questions = formBlock.questions;
  const contractorName = questions.find((q) => q.label === "Contractor Name")?.value || "";
  const typeOfService = questions.find((q) => q.label === "Type of Service")?.value || "";
  const financialInstitution = questions.find((q) => q.label === "Contractor's Financial Institution")?.value || "";
  const pointOfContact = questions.find((q) => q.label === "Contractor's Point of Contact")?.value || "";
  const phoneEmail = questions.find((q) => q.label === "Financial Institution's Phone No. and Email")?.value || "";
  
  const accountDuration = questions.find((q) => q.label === "1. How long has the contractor had an account with your financial institution?")?.value || "";
  const currentStatus = questions.find((q) => q.label === "2. Current status with the financial institution")?.value || "";
  const additionalComments = questions.find((q) => q.label === "2a. Any additional comments?")?.value || "";
  const accountingSatisfactory = questions.find((q) => q.label === "3. Have the company's accounting practices been satisfactory?")?.value || "";
  const explanation = questions.find((q) => q.label === "3a. If no, explanation")?.value || "";
  const accountTypes = questions.find((q) => q.label === "4. How many accounts and what types of accounts does the company have?")?.value || "";
  const accountType1 = questions.find((q) => q.label === "4a. Account type / amount")?.value || "";
  const accountType2 = questions.find((q) => q.label === "4b. Account type / amount")?.value || "";
  const accountType3 = questions.find((q) => q.label === "4c. Account type / amount")?.value || "";
  const operationalBalance = questions.find((q) => q.label === "5. Current operational balance")?.value || "";
  const lineOfCredit = questions.find((q) => q.label === "6. Does the contractor have a line of credit?")?.value || "";
  const performanceAssessment = questions.find((q) => q.label === "7. Financial obligation performance assessment")?.value || "";

  return `
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
        <span class="form-value">${contractorName}</span>
      </div>
      <div class="form-field">
        <span class="form-label">Type of Service:</span>
        <span class="form-value">${typeOfService}</span>
      </div>
      <div class="form-field">
        <span class="form-label">Contractor's Financial Institution:</span>
        <span class="form-value">${financialInstitution}</span>
      </div>
      <div class="form-field">
        <span class="form-label">Contractor's Point of Contact:</span>
        <span class="form-value">${pointOfContact}</span>
      </div>
      <div class="form-field">
        <span class="form-label">Financial Institution's Phone No. and Email:</span>
        <span class="form-value">${phoneEmail}</span>
      </div>
    </div>
    
    <div class="numbered-question">
      <div class="question-text">1. How long has the contractor had an account with your financial institution?</div>
      <span class="answer-line">${accountDuration}</span>.
    </div>
    
    <div class="numbered-question">
      <div class="question-text">2. What is the contractor's current status with the financial institution? (e.g., poor, fair, good, excellent, outstanding)</div>
      <span class="answer-line">${currentStatus}</span>.
      <div class="sub-question">
        <span class="sub-question-label">Any additional comments?</span>
        <span class="answer-line">${additionalComments}</span>
      </div>
    </div>
    
    <div class="numbered-question">
      <div class="question-text">3. Has the company's accounting practices been satisfactory?</div>
      <span class="answer-line">${accountingSatisfactory}</span>.
      <div class="sub-question">
        <span class="sub-question-label">If no, explanation:</span>
        <span class="answer-line">${explanation}</span>
      </div>
    </div>
    
    <div class="numbered-question">
      <div class="question-text">4. How many accounts and what types of accounts does the company have with the institution?</div>
      <span class="answer-line">${accountTypes}</span>
      <div class="sub-question">
        <span class="sub-question-label">a.</span>
        <span class="answer-line">${accountType1}</span>
      </div>
      <div class="sub-question">
        <span class="sub-question-label">b.</span>
        <span class="answer-line">${accountType2}</span>
      </div>
      <div class="sub-question">
        <span class="sub-question-label">c.</span>
        <span class="answer-line">${accountType3}</span>
      </div>
    </div>
    
    <div class="numbered-question">
      <div class="question-text">5. What is the company's current operational balance? (e.g., low, moderate, or high--five, six figure, etc.)</div>
      <span class="answer-line">${operationalBalance}</span>.
    </div>
    
    <div class="numbered-question">
      <div class="question-text">6. Does the contractor have a line of credit? (e.g., low, moderate, or high--five, six figure, etc.)</div>
      <span class="answer-line">${lineOfCredit}</span>.
    </div>
    
    <div class="numbered-question">
      <div class="question-text">7. Based on the contractor's financial history, current status, and the magnitude of this project (six figure), how do you feel the contractor will be able to perform his financial obligation?</div>
      <span class="answer-line">${performanceAssessment}</span>
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
  `;
}