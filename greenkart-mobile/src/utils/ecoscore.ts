/**
 * Calculates the number of EcoCoins to award based on a product's eco-score.
 * @param score The eco-score of the product (e.g., "A+", "A", "B", "C", "D", "E").
 * @returns The number of EcoCoins awarded.
 */
export function awardCoinsForEcoScore(score?: string): number {
  if (!score) {
    return 0; // No eco-score, no coins
  }

  const normalizedScore = score.toUpperCase().trim();

  switch (normalizedScore) {
    case 'A+':
      return 50;
    case 'A':
      return 30;
    case 'B':
      return 10;
    default:
      return 0; // For C, D, E, or unknown scores
  }
}
