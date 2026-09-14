import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Server is running" });
}
