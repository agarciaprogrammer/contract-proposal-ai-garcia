import { NextResponse } from "next/server";
import { loadEntity } from "@/lib/data";

export async function GET() {
  return NextResponse.json(loadEntity());
}