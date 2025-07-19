import { NextRequest, NextResponse } from "next/server";
import { loadAllContracts } from "@/lib/data";
import { loadEntity } from "@/lib/data";
import { proposalChain } from "@/lib/ai";
import { generateFormAnswers } from "@/lib/formFiller";

export async function POST(req: NextRequest) {
  const { contractId } = await req.json();
  const contract = loadAllContracts().find((c) => c.id === contractId);
  if (!contract) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entity = loadEntity();
  const { blocks } = await proposalChain.invoke({ contract, entity });

  // Pre-fill forms server-side
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "form") {
      const answers = await generateFormAnswers(b.questions, entity, contract);
      b.questions = b.questions.map((q: { label: string; value: string }, j: number) => ({ ...q, value: answers[j] || "" }));
    }
  }

  return NextResponse.json({ blocks });
}