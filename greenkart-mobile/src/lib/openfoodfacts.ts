interface OpenFoodFactsProduct {
  product: {
    product_name?: string;
    brands?: string;
    image_front_url?: string;
    categories?: string;
    ecoscore_grade?: string; // e.g., "a", "b", "c", "d", "e"
  };
  status: number; // 1 if found, 0 if not found
  status_verbose: string;
}

export interface ProductData {
  name: string;
  brand?: string;
  image?: string;
  categories?: string;
  eco_score?: string; // Normalized eco-score grade
}

/**
 * Looks up product information from the OpenFoodFacts API using a barcode.
 * @param barcode The barcode of the product to look up.
 * @returns A normalized ProductData object if found, otherwise null.
 */
export async function lookupProduct(barcode: string): Promise<ProductData | null> {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  console.log(`OpenFoodFacts: Looking up product for barcode: ${barcode}`);

  try {
    const response = await fetch(url);
    const data: OpenFoodFactsProduct = await response.json();

    if (data.status === 1 && data.product) {
      const product = data.product;
      console.log('OpenFoodFacts: Product found:', product.product_name);

      // Normalize the eco_score_grade to a more readable format if needed,
      // or just use it directly. OpenFoodFacts uses 'a', 'b', 'c', 'd', 'e'.
      // We might want to convert it to 'A+', 'A', 'B', etc. for display.
      const ecoScoreMapping: { [key: string]: string } = {
        'a': 'A+',
        'b': 'A',
        'c': 'B',
        'd': 'C',
        'e': 'D',
      };
      const normalizedEcoScore = product.ecoscore_grade ? ecoScoreMapping[product.ecoscore_grade.toLowerCase()] || product.ecoscore_grade.toUpperCase() : undefined;


      return {
        name: product.product_name || 'Unknown Product',
        brand: product.brands,
        image: product.image_front_url,
        categories: product.categories,
        eco_score: normalizedEcoScore,
      };
    } else {
      console.log(`OpenFoodFacts: Product not found for barcode: ${barcode}`);
      return null;
    }
  } catch (error) {
    console.error(`OpenFoodFacts: Error looking up product ${barcode}:`, error);
    return null;
  }
}
