import React, { useState, useEffect } from 'react';
import ProductPreviewWrapper from './ProductPreviewWrapper';
import Grid from '@mui/material/Grid';
import database from "../../backend/Database/DBInstance";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import "./wishlist.css";
function WishList(props) {
    var _a = useState([]), likedList = _a[0], setLikedList = _a[1];
    var readOneUserInfo = function (id) {
        onValue(ref(database, 'users/' + id), function (snapshot) {
            var userInfo = snapshot.val();
            if (userInfo != null) {
                if (userInfo["liked-items"] != null) {
                    setLikedList(userInfo["liked-items"]);
                }
            }
        });
    };
    useEffect(function () {
        readOneUserInfo(props.userID);
    }, []);
    var likedItemIds = [];
    for (var _i = 0, _b = Object.entries(likedList); _i < _b.length; _i++) {
        var _c = _b[_i], itemId = _c[0], _ = _c[1];
        likedItemIds.push(itemId);
    }
    return (React.createElement("div", { className: "wish-list-container" },
        React.createElement("div", { className: "wish-list-header" }, "Liked Items"),
        React.createElement("div", { className: "wish-list-item-spacing" },
            React.createElement(Grid, { container: true, spacing: 4 }, likedItemIds.map(function (id) {
                return React.createElement(Grid, { item: true, xs: 6, md: 4, lg: 3, display: "flex" },
                    React.createElement(ProductPreviewWrapper, { productId: id }));
            })))));
}
export default WishList;
//# sourceMappingURL=WishList.js.map