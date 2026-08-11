export function priceHelper(product, variant = null) {
  const price = variant?.price || product?.price;
  const sale_price = variant?.sale_price || product?.sale_price;

  if (variant) {
    return { price, sale_price };
  }

  if (product?.type == "simple") {
    return {
      price: product?.price,
      sale_price: product?.sale_price,
    };
  } else {
    return {
      price: product?.varients?.[0]?.price || product?.price,
      sale_price: product?.varients?.[0]?.sale_price || product?.sale_price,
    };
  }
}

/**
 * Format a price with a currency symbol.
 * In CLIENT components, prefer: const { formatPrice } = useCurrency()
 * This helper is for SERVER components or places without context access.
 *
 * @param {number} amount - the price to format
 * @param {string} symbol - currency symbol (e.g. "$", "₹")
 * @returns {string} e.g. "$1,299.00"
 */
export function formatPrice(amount, symbol = "") {
  if (amount === null || amount === undefined) return "";
  const formatted = Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}


export function productUrl(product, variant = null) {
  if (!product) return "#";

  if (product.type == "simple") {
    return `/shop/${product.slug}`;
  } else {
    const variantSlug = variant?.slug || product.varients?.[0]?.slug;
    return `/shop/${product.slug}/${variantSlug}`;
  }
}
