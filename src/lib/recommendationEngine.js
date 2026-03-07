export function getRecommendations(product, allProducts) {

  if (!product) return [];

  const recommendations = [];

  // Example rule: Shirt → Pants
  if (product.category === "Shirt") {
    const pants = allProducts.filter(
      (p) => p.category === "Pant"
    );

    recommendations.push(...pants);
  }

  // Example rule: Laptop → Laptop Accessories
  if (product.category === "Laptop") {
    const accessories = allProducts.filter(
      (p) => p.category === "Laptop Accessories"
    );

    recommendations.push(...accessories);
  }

  // fallback → same category products
  if (recommendations.length === 0) {
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }

  return recommendations.slice(0, 4);
}