import Order from "@/models/Order";

export async function createEscrow(order){

  order.escrowStatus = "held";

  await order.save();

  return order;

}

export async function releaseEscrow(orderId){

  const order = await Order.findById(orderId);

  order.escrowStatus = "released";

  await order.save();

  return order;

}

export async function refundEscrow(orderId){

  const order = await Order.findById(orderId);

  order.escrowStatus = "refunded";

  await order.save();

  return order;

}