import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

export async function getPlatformStats(){

  const totalUsers = await User.countDocuments();

  const totalProducts = await Product.countDocuments();

  const totalOrders = await Order.countDocuments();

  const revenue = await Order.aggregate([
    {
      $group:{
        _id:null,
        total:{$sum:"$amount"}
      }
    }
  ]);

  return {
    users:totalUsers,
    products:totalProducts,
    orders:totalOrders,
    revenue:revenue[0]?.total || 0
  }

}