import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const diagnosticsCount = Array.isArray(body?.diagnostics)
      ? body.diagnostics.length
      : 0;

    let score = Math.max(0, 100 - diagnosticsCount * 8);
    let label = "Good";
    if (score < 50) label = "Poor";
    else if (score < 80) label = "Fair";

    return NextResponse.json({
      score,
      label,
      diagnosticsCount,
    });
  } catch {
    return NextResponse.json(
      { score: 100, label: "Good", diagnosticsCount: 0 },
      { status: 200 }
    );
  }
}
