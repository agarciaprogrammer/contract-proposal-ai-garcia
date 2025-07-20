import { NextRequest, NextResponse } from "next/server";
import { getAlignmentScore } from "@/lib/ai";

export async function POST(req: NextRequest) {
  console.log("[API contractAlignment] Request received");
  try {
    const { entity, contract } = await req.json();
    const result = await getAlignmentScore(entity, contract);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API contractAlignment] Error:", error);
    return NextResponse.json({ alignment: 0, explanation: "Could not calculate alignment percentage." }, { status: 500 });
  }
}
