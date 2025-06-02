import menuData from '../mocks/menu.json';

export const getMenuData = async () => {
  try {
    // En un caso real, aquí haríamos una llamada API
    return menuData;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
};