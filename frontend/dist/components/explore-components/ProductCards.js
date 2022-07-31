var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// Component Imports
import TinderCard from "react-tinder-card";
// CSS Import
import './product-cards.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// MUI Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
// Database Imports
import { ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../../backend/Database/DBInstance';
function ProductCards(props) {
    var _this = this;
    var _a = useState([]), products = _a[0], setProducts = _a[1];
    // const [products, setProducts] = useState(sample);  
    var _b = useState([]), pids = _b[0], setPids = _b[1];
    // state for liked ToolTip component
    var _c = React.useState(false), open = _c[0], setOpen = _c[1];
    var handleTooltipClose = function () {
        setOpen(false);
    };
    var handleTooltipOpen = function () {
        setOpen(true);
        addToLikedList();
    };
    var _d = useState(products.length - 1), currentIndex = _d[0], setCurrentIndex = _d[1];
    var _e = useState(), lastDirection = _e[0], setLastDirection = _e[1];
    // used for outOfFrame closure
    var currentIndexRef = useRef(currentIndex);
    var navigate = useNavigate();
    var getAllProducts = function () {
        console.log("Calling getAllProds");
        // clear current products
        setProducts([]);
        var unsubscribe = onValue(ref(database, 'products'), function (snapshot) {
            // save all of the childSnapshots in an array
            var i = 1;
            snapshot.forEach(function (childSnapshot) {
                setProducts(function (products) { return __spreadArray(__spreadArray([], products, true), [childSnapshot.val()], false); });
                i++;
            });
        });
        return function () {
            // unsubscribe / cleanup from the database
            unsubscribe();
        };
    };
    var getRecommendations = function () {
        console.log("Calling getRecommendations");
        // clear current products
        setProducts([]);
        var postConfig = { headers: {} };
        var recommendUrl = "http://127.0.0.1:4567/recommend";
        axios.post(recommendUrl, postConfig)
            .then(function (response) {
            console.log("Receiving product ids from /recommend", response.data['result']);
            setPids(response.data['result']);
            // loop through the pids array to get the product IDs from the database, and set products to the products array
            response.data['result'].forEach(function (pid) {
                onValue(ref(database, 'products/' + pid), function (snapshot) {
                    setProducts(function (products) { return __spreadArray(__spreadArray([], products, true), [snapshot.val()], false); });
                });
            });
        })
            .catch(function (e) { return console.log("Erroring"); });
    };
    var addToLikedList = function () {
        console.log("Added to liked list");
        // get produt id of current product
        var pid = products[currentIndex].id;
        var likedListRef = ref(database, 'users/' + props.userID + '/liked-items/' + pid);
        set(likedListRef, "true");
    };
    useEffect(function () {
        // if not logged in, show all products, else show recommendations
        if (!props.isLoggedIn) {
            console.log("Not logged in");
            getAllProducts();
        }
        else {
            console.log("Logged in");
            getRecommendations();
        }
    }, [props.isLoggedIn]);
    var childRefs = useMemo(function () {
        return Array(products.length)
            .fill(0)
            .map(function (i) { return React.createRef(); });
    }, [products]);
    var updateCurrentIndex = function (val) {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };
    var canGoBack = currentIndex < products.length - 1;
    var canSwipe = currentIndex >= 0;
    var firstSwipe = currentIndex === -1 && products.length > 0;
    // set last direction and decrease current index
    var swiped = function (direction, index) {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };
    var outOfFrame = function (dir, name, idx, id) {
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
        // if swipe was right, go to "/product/product-name"
        if (dir === 'right') {
            navigate("/product/".concat(id));
        }
    };
    var swipe = function (dir) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(canSwipe && currentIndex < products.length)) return [3 /*break*/, 2];
                    return [4 /*yield*/, childRefs[currentIndex].current.swipe(dir)]; // Swipe the card!
                case 1:
                    _a.sent(); // Swipe the card!
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    // increase current index and show card
    var goBack = function () { return __awaiter(_this, void 0, void 0, function () {
        var newIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!canGoBack)
                        return [2 /*return*/];
                    newIndex = currentIndex + 1;
                    updateCurrentIndex(newIndex);
                    return [4 /*yield*/, childRefs[newIndex].current.restoreCard()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: 'swiper-container' },
        React.createElement("div", { className: "cards-container" }, products.map(function (product, index) { return (React.createElement(TinderCard, { ref: childRefs[index], className: "swipe", 
            // give each card a unique key, efficient to re-render
            key: product.id, 
            // update current index when card is swiped
            onSwipe: function (dir) { return swiped(dir, index); }, 
            // when card leaves screen, update current index
            onCardLeftScreen: function (dir) { return outOfFrame(dir, product.name, index, product.id); }, 
            // only allow swiping left or right
            preventSwipe: ['up', 'down'] },
            React.createElement(Card, { sx: { maxWidth: 600 }, elevation: 2 },
                React.createElement(CardMedia, { component: "img", height: "300", image: product.pictures[0], alt: "product picture" }),
                React.createElement(CardContent, { className: 'product-card' },
                    React.createElement(Typography, { gutterBottom: true, variant: "h5", component: "div" }, product.name.length > 25 ? product.name.substring(0, 20) + "..." : product.name),
                    React.createElement(Typography, { variant: "body2", color: "text.secondary" }, product.description.length > 50 ? product.description.substring(0, 50) + " [...]" : product.description),
                    React.createElement("div", { className: 'price' },
                        React.createElement(Typography, { variant: "h5", color: "white" }, product.price.charAt(0) !== '$' ? "$".concat(product.price) : product.price)))))); })),
        React.createElement("div", { className: 'product-buttons' },
            React.createElement(IconButton, { style: { backgroundColor: !canSwipe && '#c3c4d3' }, className: "left", onClick: function () { return swipe('left'); } },
                React.createElement(CloseIcon, { fontSize: "large" })),
            React.createElement(IconButton, { style: { backgroundColor: !canGoBack && '#c3c4d3' }, className: "repeat", onClick: function () { return goBack(); } },
                React.createElement(ReplayIcon, { fontSize: "large" })),
            React.createElement(ClickAwayListener, { onClickAway: handleTooltipClose },
                React.createElement("div", null,
                    React.createElement(Tooltip, { PopperProps: {
                            disablePortal: true,
                        }, onClose: handleTooltipClose, open: open, disableFocusListener: true, disableHoverListener: true, disableTouchListener: true, title: "Liked!" },
                        React.createElement(IconButton, { style: { backgroundColor: !canSwipe && '#c3c4d3' }, className: "like", onClick: function () {
                                // add product
                                return handleTooltipOpen();
                            } },
                            React.createElement(FavoriteIcon, { fontSize: "large" }))))),
            React.createElement(IconButton, { style: { backgroundColor: !canSwipe && '#c3c4d3' }, className: "right", onClick: function () { return swipe('right'); } },
                React.createElement(ShoppingBagIcon, { fontSize: "large" }))),
        props.isLoggedIn ?
            React.createElement("div", { className: "listing-container" },
                React.createElement(Tooltip, { title: "Add new listing" },
                    React.createElement(Button, { className: 'new-listing', variant: 'outlined', 
                        // add more border radius
                        sx: {
                            borderRadius: '25%',
                            border: '1px solid #c3c4d3',
                            // on hover, change border color
                            '&:hover': {
                                borderColor: '#c3c4d3',
                            },
                        }, onClick: function () { return navigate('/sell'); } },
                        React.createElement(AddIcon, { fontSize: "large" })))) : null));
}
export default ProductCards;
//# sourceMappingURL=ProductCards.js.map