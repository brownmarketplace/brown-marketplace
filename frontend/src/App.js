import Explore from './pages/Explore';
import BoilerplatePage from './pages/BoilerplatePage'
import ProfilePage from './pages/ProfilePage';
import AddListing from './pages/AddListing';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import Chat from './pages/ChatCentral';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Cookies from 'universal-cookie';
import axios from 'axios';

// Database Imports
import { ref, set, get, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from './backend/Database/DBInstance'
import ChatCentral from './pages/ChatCentral';

const App = () => {

  const cookies = new Cookies();

  // State for login
  const loginState = (response) => {  
    const id = "u" + response.googleId
    const postConfig = {headers: {}}
    // Send the user id to backend
    let toSend = {user: id}
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
    const userRef  = ref(database, 'users/' + "u" + response.googleId)
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoilerplatePage userID={cookies.get("userID")} />} />
        <Route path="/chat" element={<ChatCentral userID={cookies.get("userID")}/>} />
        <Route path="/explore" element={<Explore userID={cookies.get("userID")} loginState={loginState} logoutState={logoutState} />} />
        <Route path="/profile" element={<ProfilePage pfp={cookies.get("pfp")} name={cookies.get("name")} email={cookies.get("email")} userID={cookies.get("userID")} />}>
        <Route path=":userid" element={<ProfilePage pfp={cookies.get("pfp")} name={cookies.get("name")} email={cookies.get("email")} userID={cookies.get("userID")} />} />
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