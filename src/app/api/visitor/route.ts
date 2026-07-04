import { incrementVisitor, getVisitorCount } from "@/lib/visitor";

export const runtime = "edge";

export async function GET() {
  const count = await getVisitorCount();
  return Response.json({ count });
}

export async function POST() {
  const count = await incrementVisitor();
  return Response.json({ count });
}
