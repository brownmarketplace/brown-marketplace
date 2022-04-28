import Home from './pages/Home';
import BoilerplatePage from './pages/BoilerplatePage'
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoilerplatePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path=":username" element={<ProfilePage />} />
        </Route>
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/category/:categoryTitle" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
