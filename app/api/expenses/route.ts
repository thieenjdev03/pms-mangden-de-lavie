import type { Expense } from "@/lib/data";
import { expenses } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const row: Expense = {
    id: Date.now().toString(),
    date: String(body.date ?? ""),
    property: String(body.property ?? ""),
    type: String(body.type ?? ""),
    amount: Number(body.amount) || 0,
  };
  expenses.push(row);
  return Response.json({ success: true, expense: row });
}

export async function GET() {
  return Response.json(expenses);
}
