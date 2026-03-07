import mongoose from "mongoose";

const WithdrawalSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["bKash", "Nagad", "Bank"], required: true },
  accountDetails: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Withdrawal || mongoose.model("Withdrawal", WithdrawalSchema);