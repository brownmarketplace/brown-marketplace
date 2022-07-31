import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// Component Imports
import Title from '../boilerplate-components/Title';
import ProfilePageButton from '../boilerplate-components/ProfilePageButton';
import SearchBar from '../explore-components/SearchBar';
import ProductCards from './ProductCards';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// a variable that stores the categories and their respective MUI icon and subcategories
import categories from "./categories";
// Image Imports
import hamburger from "../../images/hamburger.png";
import pfp from "../../images/profile-pic.png";
// CSS Imports
import '../boilerplate-header.css';
import './explore-header.css';
// MUI Imports
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
function ExploreHeader(props) {
    // State for Categories Drawer
    var _a = useState(false), drawerOpen = _a[0], toggleDrawer = _a[1];
    var _b = useState(false), isLoggedIn = _b[0], setIsLoggedIn = _b[1];
    // react-router-dom for navigation
    var navigate = useNavigate();
    var handleLogin = function (response) {
        props.loginState(response);
        setIsLoggedIn(true);
    };
    var handleLogout = function () {
        props.logoutState();
        setIsLoggedIn(false);
    };
    return (React.createElement("div", { className: "boilerplate-header" },
        React.createElement("img", { src: hamburger, alt: "categories", className: "categories-button", onClick: function () { return toggleDrawer(true); } }),
        React.createElement("div", null,
            React.createElement(Title, { className: "title", title: props.title }),
            React.createElement("div", { className: "search-bar-container" },
                React.createElement(SearchBar, null)),
            React.createElement(ProductCards, { userID: props.userID, isLoggedIn: isLoggedIn })),
        React.createElement(Drawer, { PaperProps: {
                sx: {
                    backgroundColor: "#FFEFD7",
                }
            }, anchor: "left", open: drawerOpen, onClose: function () { return toggleDrawer(false); } },
            React.createElement("div", null,
                React.createElement(Typography, { ml: 2, mt: 2, variant: "h5", className: "drawer-title" }, "Categories")),
            React.createElement(List, { className: "categories" }, categories.map(function (category) { return (React.createElement(React.Fragment, null,
                React.createElement(ListItemButton, { key: category.name, onClick: function () { return navigate(category.path); } },
                    React.createElement(ListItemIcon, null, category.icon),
                    React.createElement(ListItemText, { primary: category.name })),
                React.createElement(List, { component: "div", disablePadding: true }, category.subcats.map(function (subcat) { return (React.createElement(ListItemButton, { sx: { pl: 4 }, key: subcat.name, 
                    //  On click, go to the subcategory page
                    onClick: function () { return navigate(subcat.path); } },
                    React.createElement(ListItemIcon, null, subcat.icon),
                    React.createElement(ListItemText, { primary: subcat.name }))); })),
                React.createElement(Divider, null))); }))),
        isLoggedIn ?
            React.createElement("div", { className: 'profile-container' },
                React.createElement(ProfilePageButton, { userPicture: pfp, userID: props.userID }),
                React.createElement(GoogleLogout, { clientId: "1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com", buttonText: "Logout", onLogoutSuccess: handleLogout }))
            :
                React.createElement("div", null,
                    React.createElement(GoogleLogin, { clientId: "1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com", buttonText: "Login", onSuccess: handleLogin, onFailure: handleLogin, cookiePolicy: 'single_host_origin', isSignedIn: true }))));
}
ExploreHeader.defaultProps = {
    showProfile: false
};
export default ExploreHeader;
//# sourceMappingURL=ExploreHeader.js.map