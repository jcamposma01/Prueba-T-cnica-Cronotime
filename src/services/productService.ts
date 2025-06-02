import productsData from '../mocks/products.json';

export const getProducts = async () => {
  try {
    return productsData;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};