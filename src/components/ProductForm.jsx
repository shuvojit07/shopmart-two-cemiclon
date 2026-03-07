"use client";

import { useState } from "react";

export default function ProductForm({onSubmit,defaultValues={}}){

  const [form,setForm] = useState({
    name:defaultValues.name || "",
    price:defaultValues.price || "",
    category:defaultValues.category || "",
    stock:defaultValues.stock || "",
    img:defaultValues.img || "",
    productDetails:defaultValues.productDetails || ""
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    onSubmit(form);
  };

  return(

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="img"
        placeholder="Image URL"
        value={form.img}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <textarea
        name="productDetails"
        placeholder="Description"
        value={form.productDetails}
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
      />

      <button className="btn btn-primary w-full">
        Save Product
      </button>

    </form>
  )
}