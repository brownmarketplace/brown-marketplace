import Explore from './pages/Explore';
import BoilerplatePage from './pages/BoilerplatePage'
import ProfilePage from './pages/ProfilePage';
import AddListing from './pages/AddListing';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import SearchResultPage from './pages/SearchResultPage';
import ProductPageV2 from './pages/ProductPageV2';
import React from 'react'

// components
import NavigationBar from './components/NavigationBar';
import FooterV2 from './components/FooterV2';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Cookies from 'universal-cookie';
import axios from 'axios';

// Database Imports
import { ref, set, get, query }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from './backend/Database/DBInstance'

// Theming
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import defaultTheme from './themes/DefaultTheme';

const theme = defaultTheme;

const App = () => {

  const cookies = new Cookies();

  // State for login
  const loginState = (response) => {
    const id = "u" + response.googleId
    const postConfig = { headers: {} }
    // Send the user id to backend
    let toSend = { user: id }
    // Fetch the recommended result from backend
    const userUrl = "http://127.0.0.1:4567/userReq"
    axios.post(userUrl, toSend, postConfig)
      .then((response) => {
        console.log("user loaded successfully in backend");
        console.log(response.data['result'])
      })
      .catch(e => console.log(e))

    cookies.set("userID", id)
    cookies.set("name", response.profileObj.name)
    cookies.set("email", response.profileObj.email)
    cookies.set("pfp", response.profileObj.imageUrl)

    // add to DB if not already there
    const userRef = ref(database, 'users/' + "u" + response.googleId)
    const q = query(userRef)
    get(q).then(snapshot => {
      if (snapshot.val() === null) {
        // add user to DB
        set(ref(database, 'users/' + "u" + response.googleId), {
          classYear: "sophomore",
          email: response.profileObj.email,
          id: id,
          name: response.profileObj.name,
          profilePic: response.profileObj.imageUrl
        })
      }
    })
  }

  const logoutState = () => {
    // remove userID from cookies
    cookies.remove("userID")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar userID={cookies.get("userID")} loginState={loginState} logoutState={logoutState} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore userID={cookies.get("userID")} loginState={loginState} logoutState={logoutState} />} />
          <Route path="/explore" element={<Explore userID={cookies.get("userID")} loginState={loginState} logoutState={logoutState} />} />
          <Route path="/home" element={<Explore userID={cookies.get("userID")} loginState={loginState} logoutState={logoutState} />} />
          <Route path="/profile" element={<ProfilePage pfp={cookies.get("pfp")} name={cookies.get("name")} email={cookies.get("email")} userID={cookies.get("userID")} />}>
            <Route path=":userid" element={<ProfilePage pfp={cookies.get("pfp")} name={cookies.get("name")} email={cookies.get("email")} userID={cookies.get("userID")} />} />
          </Route>
          <Route path="/sell" element={<AddListing userID={cookies.get("userID")} />} />
          <Route path="/result" element={<SearchResultPage userID={cookies.get("userID")} />} >
            <Route path=":category" element={<SearchResultPage userID={cookies.get("userID")} />} >
              <Route path=":subcategory" element={<SearchResultPage userID={cookies.get("userID")} />} />
            </Route>
          </Route>
          <Route path="/product/:productID" element={<ProductPageV2 userID={cookies.get("userID")} />} />
        </Routes>
      </BrowserRouter>
      <FooterV2 />
    </ThemeProvider >
  );
}

export default App;