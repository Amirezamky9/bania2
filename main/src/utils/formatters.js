
export const formatPrice = (price) => {
  if (price === null || price === undefined) return '';
  return new Intl.NumberFormat('fa-IR').format(price);
};
