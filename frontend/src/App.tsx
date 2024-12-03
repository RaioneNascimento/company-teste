import { BrowserRouter } from 'react-router-dom';
import CreateOrUpdateScreen from './pages/product/createOrUpdate';

import { Routes, Route, Navigate } from "react-router";
import ProductListScreen from './pages/product/productList';

function App() {
  return (
    <div className="h-[100vh] overflow-y-auto">
      <BrowserRouter>
        <Routes>
          <Route path="products" element={<ProductListScreen />} />

          <Route path="product/add" element={<CreateOrUpdateScreen />} />
          <Route path="product/edit/:productId" element={<CreateOrUpdateScreen />} />

          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
