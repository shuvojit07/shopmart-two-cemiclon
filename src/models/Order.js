import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // ───────────────────────────────────────────────
    // Core financials
    // ───────────────────────────────────────────────
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    platformFee: {
      type: Number,
      default: 0,
    },
    netSellerAmount: {
      type: Number,
      default: function () {
        return this.amount - (this.platformFee || 0);
      },
    },

    // ───────────────────────────────────────────────
    // Payment & Transaction
    // ───────────────────────────────────────────────
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["sslcommerz", "manual", "wallet", "other"],
      default: "sslcommerz",
    },
    tran_id: {
      type: String,
      unique: true,
      sparse: true, // allows null if not using SSLCommerz
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed, // store gateway response, card last4, etc.
    },
    paidAt: { type: Date },

    // ───────────────────────────────────────────────
    // Escrow & Delivery Lifecycle (most important part)
    // ───────────────────────────────────────────────
    escrowStatus: {
      type: String,
      enum: [
        "payment_pending",     // order created, buyer needs to pay
        "held",                // funds received, waiting for seller to ship
        "shipped",             // seller marked as shipped (tracking optional)
        "delivered",           // auto or buyer confirmed delivery
        "confirmed",           // buyer confirmed satisfaction → ready for release
        "released",            // funds sent to seller
        "disputed",            // active dispute
        "resolved",            // dispute closed (with outcome)
        "refunded",            // full refund to buyer
        "cancelled",           // order cancelled before payment or early stage
      ],
      default: "payment_pending",
      index: true,
    },

    // Timeline / Audit trail (very helpful!)
    escrowHistory: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, default: Date.now },
        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // buyer, seller, admin, or system
        },
        note: String, // "Buyer confirmed receipt", "Admin forced release", etc.
      },
    ],

    // ───────────────────────────────────────────────
    // Dispute related
    // ───────────────────────────────────────────────
    disputeOpenedAt: { type: Date },
    disputeReason: {
      type: String,
      maxlength: 200,
    },
    disputeDetails: {
      type: String,
      maxlength: 2000,
    },
    disputeEvidence: [String], // array of image URLs, tracking numbers, etc.
    resolution: {
      type: String,
      enum: ["none", "released_to_seller", "refunded_to_buyer", "partial_refund", "other"],
      default: "none",
    },
    resolutionNote: String,
    resolvedAt: { type: Date },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // usually admin

    // ───────────────────────────────────────────────
    // Delivery / Confirmation
    // ───────────────────────────────────────────────
    trackingNumber: String,
    shippingProof: [String], // URLs of photos/receipts uploaded by seller
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    confirmationDeadline: { type: Date }, // e.g. 7 days after shipped → auto-confirm?

    // ───────────────────────────────────────────────
    // Timestamps
    // ───────────────────────────────────────────────
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // automatically manages updatedAt
  }
);

// Optional: pre-save hook to maintain netSellerAmount
OrderSchema.pre("save", function (next) {
  if (this.isModified("amount") || this.isModified("platformFee")) {
    this.netSellerAmount = this.amount - (this.platformFee || 0);
  }
  next();
});

// Indexes for common queries
OrderSchema.index({ buyer: 1, createdAt: -1 });
OrderSchema.index({ seller: 1, escrowStatus: 1 });
OrderSchema.index({ escrowStatus: 1, createdAt: -1 });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);