import { NextRequest, NextResponse } from "next/server";
import { loadEntity } from "@/lib/data";
import { att3Fields } from "@/lib/pdfFields";
import { generateFormAnswers } from "@/lib/formFiller";
import { loadAllContracts } from "@/lib/data";

export async function POST(req: NextRequest) {
  const { contractId } = await req.json();
  const entity = loadEntity();
  const contract = loadAllContracts().find((c) => c.id === contractId);

  if (!contract) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 });
  }

  try {
    const questions = Object.keys(att3Fields).map(label => ({ label, value: "" }));
    const suggestedAnswers = await generateFormAnswers(questions, entity, contract);
    
    const suggestions: Record<string, string> = {};
    Object.keys(att3Fields).forEach((label, index) => {
      suggestions[label] = suggestedAnswers[index] || "";
    });

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 });
  }
} 