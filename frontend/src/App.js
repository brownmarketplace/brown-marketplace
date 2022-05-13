import Explore from './pages/Explore';
import BoilerplatePage from './pages/BoilerplatePage'
import ProfilePage from './pages/ProfilePage';
import AddListing from './pages/AddListing';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import RecommendApi from './Recommend-api';
import GoogleAuth from './backend/google';
import Cookies from 'universal-cookie';

const App = () => {

  const cookies = new Cookies();

  // State for login
  const loginState = (response) => {
    console.log("Before set", cookies.get("userID"))
    // make the props.showprofilepage true
    console.log("Google ID: ", response.googleId);
    
    cookies.set("userID", response.googleId)
    // add to DB if not already there

  }

  const logoutState = () => {
      console.log("logging out")
      // remove userID from cookies
      cookies.remove("userID")
  }

  return (
    <BrowserRouter>
    <GoogleAuth/>
    <RecommendApi/>
      <Routes>
        <Route path="/" element={<BoilerplatePage userID={cookies.get("userID")} />} />
        <Route path="/explore" element={<Explore userID={cookies.get("userID")} loginState={loginState} logoutState={logoutState} />} />
        <Route path="/profile" element={<ProfilePage  userID={cookies.get("userID")} />}>
          <Route path=":userid" element={<ProfilePage userID={cookies.get("userID")} />} />
        </Route>
        <Route path="/sell" element={<AddListing userID={cookies.get("userID")} />} />
        <Route path="/product/:productId" element={<ProductPage userID={cookies.get("userID")} />} />
        <Route path="/category" element={<CategoryPage userID={cookies.get("userID")} />} >
          <Route path=":category" element={<CategoryPage userID={cookies.get("userID")} />} >
            <Route path=":subcategory" element={<CategoryPage userID={cookies.get("userID")} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;