import React from 'react';
import Layout from './components/layout/Layout';
import BannerMain from './components/sections/BannerMain/BannerMain';
import ProductSlider from './components/sections/ProductSlider/ProductSlider';
import './assets/styles/global.css';

const App: React.FC = () => {
  return (
    <Layout>
      <BannerMain />
      <ProductSlider />
    </Layout>
  );
};

export default App;