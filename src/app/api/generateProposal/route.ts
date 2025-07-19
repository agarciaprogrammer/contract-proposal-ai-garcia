import { NextRequest, NextResponse } from "next/server";
import { loadAllContracts } from "@/lib/data";
import { loadEntity } from "@/lib/data";
import { proposalChain } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { contractId } = await req.json();
  const contract = loadAllContracts().find((c) => c.id === contractId);
  if (!contract) return NextResponse.json({ error: "Contract not found" }, { status: 404 });

  const entity = loadEntity();
  const result = await proposalChain.invoke({ contract, entity });
  return NextResponse.json(result);
}