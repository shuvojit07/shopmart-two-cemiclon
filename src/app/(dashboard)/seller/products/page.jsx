// app/seller/products/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?seller=true`, {
      cache: "no-store",
      headers: {
        // If your API needs authentication → pass cookie or token here
        // "Cookie": cookies().toString(),
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("getProducts error:", err);
    return [];
  }
}

export default async function SellerProductsPage() {
  const session = await getServerSession(authOptions);

  // ── Auth & Role protection ────────────────────────────────
  if (!session) {
    redirect("/login?callbackUrl=/seller/products");
  }

  if (session.user.role !== "seller") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            This page is only available for seller accounts.
          </p>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header + Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Products</h1>
          <p className="mt-1 text-gray-500">Manage your inventory and listings</p>
        </div>

        <Link
          href="/seller/products/create"
          className="inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-sm transition-colors"
        >
          + Add New Product
        </Link>
      </div>

      {/* Table / Empty state */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="py-20 px-6 text-center">
            <p className="text-gray-500 text-lg mb-2">You haven't added any products yet</p>
            <p className="text-gray-400 mb-6">Start by creating your first product</p>
            <Link
              href="/seller/products/create"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{product.name}</div>
                      {product.category && (
                        <div className="text-sm text-gray-500 mt-0.5">{product.category}</div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      $
                      {Number(product.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {product.stock ?? 0}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          product.isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.isAvailable ? "Active" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/seller/products/${product._id}`}
                        className="text-amber-700 hover:text-amber-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}