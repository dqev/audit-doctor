import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    score: 88,
    label: "Good",
    estimatedSavingsMonthly: "$45.00 - $120.00",
  });
}
