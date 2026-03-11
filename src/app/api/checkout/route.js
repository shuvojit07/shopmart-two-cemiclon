import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req){

  await connectDB();

  const body = await req.json();

  const session = await stripe.checkout.sessions.create({

    payment_method_types:["card"],

    line_items:[
      {
        price_data:{
          currency:"usd",
          product_data:{
            name:body.productName
          },
          unit_amount:body.amount * 100
        },
        quantity:1
      }
    ],

    mode:"payment",

    success_url:`${process.env.NEXTAUTH_URL}/success`,
    cancel_url:`${process.env.NEXTAUTH_URL}/cancel`,

  });

  await Order.create({
    buyer:body.buyerId,
    seller:body.sellerId,
    product:body.productId,
    amount:body.amount,
    escrowStatus:"held"
  });

  return Response.json({url:session.url});

}