import { prisma } from "@/lib/prisma";
import { getRecommendations } from "@/lib/recommendationEngine";

export async function GET(req) {

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const product = await prisma.product.findUnique({
    where: { slug }
  });

  const allProducts = await prisma.product.findMany();

  const recommendations = getRecommendations(product, allProducts);

  return Response.json(recommendations);
}