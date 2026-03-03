"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productCreateSchema } from "@/lib/schemas";
import toast from "react-hot-toast";

export default function ProductForm({
  onSubmit,
  isLoading = false,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productCreateSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const submitHandler = async (data) => {
    try {
      await onSubmit(data);
    } catch (err) {
      toast.error("Form submission failed");
    }
  };

  // Shared Tailwind classes for inputs
  const inputStyle = "w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:ring-4 focus:ring-amber-400/20 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400 font-medium text-black";
  const labelStyle = "block text-xs font-black uppercase tracking-widest text-black mb-2 ml-1";
  const errorStyle = "text-red-500 text-xs font-bold mt-1 ml-1 capitalize";

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
      
      {/* SECTION: Basic Info */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className={labelStyle}>Product Title *</label>
          <input
            {...register("name")}
            className={inputStyle}
            placeholder="e.g. Vintage Leather Watch"
          />
          {errors.name && <p className={errorStyle}>{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelStyle}>Full Description *</label>
          <textarea
            {...register("description")}
            className={`${inputStyle} min-h-[120px] resize-none`}
            placeholder="Tell your customers everything about this item..."
          />
          {errors.description && <p className={errorStyle}>{errors.description.message}</p>}
        </div>
      </div>

      {/* SECTION: Pricing & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={labelStyle}>Price (USD) *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-black">$</span>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={`${inputStyle} pl-8`}
              placeholder="0.00"
            />
          </div>
          {errors.price && <p className={errorStyle}>{errors.price.message}</p>}
        </div>

        <div>
          <label className={labelStyle}>Discount Price</label>
          <div className="relative text-slate-400">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
            <input
              type="number"
              step="0.01"
              {...register("discountPrice", { valueAsNumber: true })}
              className={`${inputStyle} pl-8 border-slate-200 focus:border-amber-500`}
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className={labelStyle}>Stock Level *</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className={inputStyle}
            placeholder="Quantity"
          />
          {errors.stock && <p className={errorStyle}>{errors.stock.message}</p>}
        </div>
      </div>

      {/* SECTION: Category & Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Category *</label>
          <select {...register("category")} className={`${inputStyle} appearance-none cursor-pointer`}>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
            <option value="Others">Others</option>
          </select>
          {errors.category && <p className={errorStyle}>{errors.category.message}</p>}
        </div>

        <div>
          <label className={labelStyle}>Image URL *</label>
          <input
            {...register("img")}
            className={inputStyle}
            placeholder="https://..."
          />
          {errors.img && <p className={errorStyle}>{errors.img.message}</p>}
        </div>
      </div>

      {/* SECTION: Visibility */}
      <div className="flex items-center justify-between p-4 bg-slate-50 border-2 border-black rounded-2xl">
        <div>
          <h4 className="font-bold text-black">Product Visibility</h4>
          <p className="text-xs text-slate-500 font-medium tracking-tight">Make this listing public immediately</p>
        </div>
        <input
          type="checkbox"
          {...register("isAvailable")}
          className="toggle toggle-warning border-black bg-black checked:bg-amber-400 checked:border-black"
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black hover:bg-slate-900 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-[6px_6px_0px_0px_#fbbf24] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-70 flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Processing...
          </>
        ) : (
          "Save Product & Go Live"
        )}
      </button>
    </form>
  );
}