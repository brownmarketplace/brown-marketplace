import Explore from './pages/Explore';
import BoilerplatePage from './pages/BoilerplatePage';
import ProfilePage from './pages/ProfilePage';
import AddListing from './pages/AddListing';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import SearchResultPage from './pages/SearchResultPage';
import ProductPageV2 from './pages/ProductPageV2';
// components
import NavigationBar from './components/NavigationBar';
import FooterV2 from './components/FooterV2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
// Database Imports
import { ref, set, get, query } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from './backend/Database/DBInstance';
// Theming
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import defaultTheme from './themes/DefaultTheme';
var theme = defaultTheme;
var App = function () {
    var cookies = new Cookies();
    // State for login
    var loginState = function (response) {
        var id = "u" + response.googleId;
        var postConfig = { headers: {} };
        // Send the user id to backend
        var toSend = { user: id };
        // Fetch the recommended result from backend
        var userUrl = "http://127.0.0.1:4567/userReq";
        axios.post(userUrl, toSend, postConfig)
            .then(function (response) {
            console.log("user loaded successfully in backend");
            console.log(response.data['result']);
        })
            .catch(function (e) { return console.log(e); });
        cookies.set("userID", id);
        cookies.set("name", response.profileObj.name);
        cookies.set("email", response.profileObj.email);
        cookies.set("pfp", response.profileObj.imageUrl);
        // add to DB if not already there
        var userRef = ref(database, 'users/' + "u" + response.googleId);
        var q = query(userRef);
        get(q).then(function (snapshot) {
            if (snapshot.val() === null) {
                // add user to DB
                set(ref(database, 'users/' + "u" + response.googleId), {
                    classYear: "sophomore",
                    email: response.profileObj.email,
                    id: id,
                    name: response.profileObj.name,
                    profilePic: response.profileObj.imageUrl
                });
            }
        });
    };
    var logoutState = function () {
        // remove userID from cookies
        cookies.remove("userID");
    };
    return (React.createElement(ThemeProvider, { theme: theme },
        React.createElement(CssBaseline, null),
        React.createElement(NavigationBar, null),
        React.createElement(BrowserRouter, null,
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(BoilerplatePage, { userID: cookies.get("userID") }) }),
                React.createElement(Route, { path: "/explore", element: React.createElement(Explore, { userID: cookies.get("userID"), loginState: loginState, logoutState: logoutState }) }),
                React.createElement(Route, { path: "/profile", element: React.createElement(ProfilePage, { pfp: cookies.get("pfp"), name: cookies.get("name"), email: cookies.get("email"), userID: cookies.get("userID") }) },
                    React.createElement(Route, { path: ":userid", element: React.createElement(ProfilePage, { pfp: cookies.get("pfp"), name: cookies.get("name"), email: cookies.get("email"), userID: cookies.get("userID") }) })),
                React.createElement(Route, { path: "/sell", element: React.createElement(AddListing, { userID: cookies.get("userID") }) }),
                React.createElement(Route, { path: "/product/:productId", element: React.createElement(ProductPage, { userID: cookies.get("userID") }) }),
                React.createElement(Route, { path: "/category", element: React.createElement(CategoryPage, { userID: cookies.get("userID") }) },
                    React.createElement(Route, { path: ":category", element: React.createElement(CategoryPage, { userID: cookies.get("userID") }) },
                        React.createElement(Route, { path: ":subcategory", element: React.createElement(CategoryPage, { userID: cookies.get("userID") }) }))),
                React.createElement(Route, { path: "/result", element: React.createElement(SearchResultPage, { userID: cookies.get("userID") }) }),
                React.createElement(Route, { path: "/productV2/:productId", element: React.createElement(ProductPageV2, { userID: cookies.get("userID") }) }))),
        React.createElement(FooterV2, null)));
};
export default App;
//# sourceMappingURL=App.js.map