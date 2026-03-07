export function calculateBoost(product){

  let score = 0;

  score += product.rating * 20;

  score += product.reviews * 5;

  score += product.stock > 0 ? 10 : 0;

  score += product.boostScore;

  return score;

}