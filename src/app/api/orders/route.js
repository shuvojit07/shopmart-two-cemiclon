import { NextResponse } from "next/server";

export async function GET() {
  const orders = [
    {
      id: 1,
      product: "Wireless Headphone",
      buyer: "John",
      amount: 120,
      status: "escrow_held",
    },
  ];

  return NextResponse.json(orders);
}