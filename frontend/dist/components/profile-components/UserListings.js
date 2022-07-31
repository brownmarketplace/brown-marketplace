import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserListingItem from './UserListingItem';
import database from "../../backend/Database/DBInstance";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import './user-listings.css';
function UserListings(props) {
    var _a = useState([]), listingIdInfo = _a[0], setListingIdInfo = _a[1];
    var readOneUserInfo = function (id) {
        onValue(ref(database, 'users/' + id), function (snapshot) {
            var userInfo = snapshot.val();
            if (userInfo != null) {
                if (userInfo.listings != null) {
                    setListingIdInfo(userInfo.listings);
                }
            }
        });
    };
    useEffect(function () {
        readOneUserInfo(props.userId);
    }, []);
    var AddListingButton = function () {
        return (React.createElement("div", { className: "user-listing-item" },
            React.createElement(Link, { to: "/sell", className: "add-listing-link" }, "+ Add new listing")));
    };
    var UserListingsMapper = function (props) {
        var listingIds = [];
        for (var _i = 0, _a = Object.entries(props.listings); _i < _a.length; _i++) {
            var _b = _a[_i], prodId = _b[0], _ = _b[1];
            listingIds.push(prodId);
        }
        return (React.createElement("div", null, listingIds.map(function (id) {
            return React.createElement(UserListingItem, { prodId: id });
        })));
    };
    return (React.createElement("div", { className: "user-listing" },
        React.createElement("div", { className: "user-listing-header" }, "Listings"),
        listingIdInfo ? (React.createElement("div", null,
            React.createElement(UserListingsMapper, { listings: listingIdInfo }))) : (React.createElement("div", null)),
        React.createElement(AddListingButton, null)));
}
export default UserListings;
//# sourceMappingURL=UserListings.js.map