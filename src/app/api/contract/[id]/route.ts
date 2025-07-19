import { NextRequest, NextResponse } from "next/server";
import { loadAllContracts } from "@/lib/data";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contract = loadAllContracts().find((c) => c.id === id);
  return contract
    ? NextResponse.json(contract)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}