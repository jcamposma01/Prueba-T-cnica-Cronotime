import footerData from '../mocks/footer.json';

export const getFooterData = async () => {
  try {
    return footerData;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    throw error;
  }
};