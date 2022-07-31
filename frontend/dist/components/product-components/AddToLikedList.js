import React, { useState, useEffect } from 'react';
// mui
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// database
import { ref, set, remove, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../../backend/Database/DBInstance';
function AddToLikedList(props) {
    var _a = useState(false), isInLikedlist = _a[0], setIsInLikedlist = _a[1];
    // database endpoint
    var likedListRef = ref(database, 'users/' + props.userID + '/liked-items/' + props.productID);
    // read from database
    var getIsLiked = function () {
        onValue(likedListRef, function (snapshot) {
            var likedList = snapshot.val();
            setIsInLikedlist(likedList === 'true');
        });
    };
    // write to database
    var writeToLikedList = function () {
        console.log(isInLikedlist ? 'removing from wishlist' : 'adding to wishlist');
        isInLikedlist
            ? remove(likedListRef)
            : set(likedListRef, "true");
    };
    // retrieve data from database
    useEffect(function () {
        if (props.userID == null) {
            return;
        }
        getIsLiked();
    }, [props]);
    // event listener
    var toggleLikedList = function () {
        if (props.userID == null) {
            console.log("please log in");
            return;
        }
        writeToLikedList();
        setIsInLikedlist(!isInLikedlist);
    };
    return (React.createElement(Tooltip, { title: "Add to liked lish" },
        React.createElement(IconButton, { color: "primary", onClick: toggleLikedList, sx: { padding: 0, margin: 1 } }, isInLikedlist
            ? React.createElement(FavoriteIcon, null)
            : React.createElement(FavoriteBorderIcon, null))));
}
AddToLikedList.defaultProps = {
    productID: null,
    userID: null,
};
export default AddToLikedList;
//# sourceMappingURL=AddToLikedList.js.map