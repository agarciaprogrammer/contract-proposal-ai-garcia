// src/app/api/downloadProposal/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";

export async function POST(_req: NextRequest) {
  const html = `
    <html>
      <head>
        <title>Gunn Construction LLC Proposal</title>
        <style>
          @page {
            margin: 1in;
            size: letter;
          }
          
          body {
            font-family: "Times New Roman", serif;
            font-size: 12pt;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: #000;
          }
          
          h1 {
            font-size: 18pt;
            font-weight: bold;
            margin: 30px 0 20px 0;
            text-align: center;
            color: #1a365d;
          }
          
          p {
            margin-bottom: 12px;
            text-align: justify;
          }
          
          ul {
            margin: 15px 0;
            padding-left: 20px;
          }
          
          li {
            margin-bottom: 8px;
            text-align: justify;
          }
        </style>
      </head>
      <body>
        <h1>Gunn Construction LLC Proposal for Bleacher Seating Systems</h1>
        
        <p>Gunn Construction LLC is pleased to submit our proposal in response to the solicitation FA301625Q0050 issued by the 343rd Training Squadron at Joint Base San Antonio. We are committed to delivering high-quality bleacher seating systems that meet the requirements outlined in the Statement of Work.</p>
        
        <ul>
          <li>Eight (8) Bleacher Seating Systems each accommodating 125 personnel.</li>
          <li>Compliance with the Non-Manufacturer Rule (NMR).</li>
          <li>Delivery only, with no installation required.</li>
          <li>Total Small Business Set-Aside under FAR 19.5.</li>
        </ul>
      </body>
    </html>
  `;
  
  const pdf = await generatePDF(html);
  return new NextResponse(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="gunn-construction-proposal.pdf"`,
    },
  });
}