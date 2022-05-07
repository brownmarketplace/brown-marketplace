import Explore from './pages/Explore';
import BoilerplatePage from './pages/BoilerplatePage'
import ProfilePage  from './pages/ProfilePage';
import AddListing from './pages/AddListing';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import ExploreApi from './Explore-api';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoilerplatePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path=":username" element={<ProfilePage />} />
        </Route>
        <Route path="/sell" element={<AddListing />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/category/:categoryTitle" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;