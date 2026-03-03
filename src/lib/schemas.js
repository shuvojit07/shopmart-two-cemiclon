import { z } from "zod";

/* =====================================
   1️⃣ Base Object Schema (NO refine here)
===================================== */

const baseProductSchema = z.object({
  name: z.string().min(3).max(200),

  description: z.string().min(20).max(2000),

  shortDescription: z.string().max(160).optional(),

  price: z.coerce.number().min(1),

  discountPrice: z.coerce.number().min(0).optional().nullable(),

  category: z.enum([
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Automotive",
    "Groceries",
    "Others",
  ]),

  stock: z.coerce.number().min(0),

  isAvailable: z.boolean().default(true),

  img: z.string().url().optional(),
});

/* =====================================
   2️⃣ Business Rule (Refinement)
===================================== */

const discountValidation = (data) =>
  !data.discountPrice ||
  data.discountPrice === 0 ||
  data.discountPrice < data.price;

/* =====================================
   3️⃣ Create Schema
===================================== */

export const productCreateSchema = baseProductSchema
  .extend({
    img: z
      .string({
        required_error: "Main image is required",
      })
      .url("Please provide a valid image URL"),
  })
  .refine(discountValidation, {
    message: "Discount price must be less than regular price",
    path: ["discountPrice"],
  });

/* =====================================
   4️⃣ Update Schema (Partial Safe)
===================================== */

export const productUpdateSchema = baseProductSchema
  .partial()
  .refine(
    (data) =>
      !data.discountPrice ||
      !data.price ||
      data.discountPrice < data.price,
    {
      message: "Discount price must be less than regular price",
      path: ["discountPrice"],
    }
  );