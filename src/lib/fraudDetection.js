import Order from "@/models/Order";

export async function detectFraud(userId){

  const orders = await Order.find({buyer:userId});

  if(orders.length > 50){

    return {
      risk:"HIGH",
      reason:"Too many purchases"
    }

  }

  const refunds = orders.filter(o=>o.escrowStatus==="refunded");

  if(refunds.length > 10){

    return {
      risk:"HIGH",
      reason:"Too many refunds"
    }

  }

  return {
    risk:"LOW"
  }

}