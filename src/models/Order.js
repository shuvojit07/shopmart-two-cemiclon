import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: { type: Number, required: true },
  // Order.js moddhe eita add korun
  disputeReason: { type: String },
  disputeDetails: { type: String },
  resolution: {
    type: String,
    enum: ["none", "released", "refunded"],
    default: "none",
  },
  // Payment & Escrow Status
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  escrowStatus: {
    type: String,
    enum: ["hold", "shipped", "received", "released", "disputed"],
    default: "hold",
  },

  tran_id: { type: String, unique: true }, // SSLCommerz Transaction ID
  isDelivered: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
