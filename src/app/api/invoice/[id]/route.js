import Order from "@/models/Order";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const order = await Order.findById(id).populate("buyer seller product");

  const html = `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #334155; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #f59e0b; padding-bottom: 20px; }
          .amber { color: #f59e0b; }
          .info { margin-top: 40px; display: grid; grid-template-cols: 1fr 1fr; gap: 40px; }
          .table { width: 100%; margin-top: 40px; border-collapse: collapse; }
          .table th { background: #f8fafc; padding: 12px; text-align: left; }
          .table td { padding: 12px; border-bottom: 1px solid #f1f5f9; }
          .total { text-align: right; margin-top: 30px; font-size: 24px; font-weight: bold; }
          @media print { .print-btn { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>INVOICE <span class="amber">#${order.tran_id}</span></h1>
          <button onclick="window.print()" class="print-btn">Print Now</button>
        </div>
        <div class="info">
          <div>
            <h3>Buyer Details</h3>
            <p>${order.buyer.name}<br/>${order.buyer.email}</p>
          </div>
          <div>
            <h3>Seller Details</h3>
            <p>${order.seller.name}<br/>Escrow Status: <b>${order.escrowStatus}</b></p>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr><th>Product Description</th><th>Price</th></tr>
          </thead>
          <tbody>
            <tr><td>${order.product.name}</td><td>$${order.amount}</td></tr>
          </tbody>
        </table>
        <div class="total">Total Paid: $${order.amount}</div>
      </body>
    </html>
  `;

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}