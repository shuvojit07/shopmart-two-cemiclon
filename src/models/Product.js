import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    discountPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Beauty & Personal Care",
        "Sports & Outdoors",
        "Toys & Games",
        "Automotive",
        "Groceries",
        "Others",
      ],
      index: true,
    },

    brand: {
      type: String,
      default: "No Brand",
    },

    sellerName: {
      type: String,
      required: true,
      trim: true,
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    img: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    productDetails: {
      type: String,
      required: true,
      minlength: 20,
    },

    shortDescription: {
      type: String,
      maxlength: 160,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    // 🔥 ADD THESE (Recommended)

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    specifications: {
      type: Object,
      default: {},
    },

    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    salesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);