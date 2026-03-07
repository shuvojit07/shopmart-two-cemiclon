import Order from "@/models/Order";

export async function releasePayment(orderId){

  const order = await Order.findById(orderId);

  order.escrowStatus="released";

  await order.save();

  return order;

}