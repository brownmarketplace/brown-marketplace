import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './boilerplate-page.css';
// components
import BoilerplateHeader from '../components/BoilerplateHeader';
import PageBreadcrumbs from '../components/product-components/PageBreadcrumbs';
import AddToLikedList from '../components/product-components/AddToLikedList';
import CopyToClipboard from '../components/product-components/CopyToClipboard';
import SellerCard from '../components/product-components/SellerCard';
// mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
// database
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../backend/Database/DBInstance';
function ProductPage(props) {
    // get url parameters
    var productId = useParams().productId;
    // page navigation
    var navigate = useNavigate();
    // product info
    var _a = useState(props.productInfo.images[0]), image = _a[0], setImage = _a[1];
    var _b = useState(props.productInfo), productInfo = _b[0], setProductInfo = _b[1];
    // read from database
    var getProductInfo = function () {
        onValue(ref(database, 'products/' + productId), function (snapshot) {
            var product = snapshot.val();
            if (product == null) {
                return;
            }
            setProductInfo({
                category: product.category,
                subcategory: product['sub-category'],
                id: product.id,
                title: product.name,
                price: product.price,
                description: product.description,
                images: product.pictures,
                seller: product.seller,
                sold: product.sold,
                tags: Object.keys(product.tags)
            });
            setImage(product.pictures[0]);
        });
    };
    // retrieve data from database
    useEffect(function () {
        getProductInfo();
    }, []);
    return (React.createElement("div", { className: "boilerplate" },
        React.createElement(BoilerplateHeader, { title: "Brown Marketplace", userPicture: props.pfp, userID: props.userID }),
        React.createElement("div", { style: { textAlign: 'center', marginTop: '30px' } },
            React.createElement(Grid, { container: true, direction: "column", justifyContent: "center", spacing: 1, paddingLeft: "10%", paddingRight: "10%" },
                React.createElement(Grid, { item: true },
                    React.createElement(PageBreadcrumbs, { path: [{ title: "All Products", href: "/category" },
                            { title: productInfo.category, href: "/category/".concat(productInfo.category) },
                            { title: productInfo.subcategory, href: "/category/".concat(productInfo.category, "/").concat(productInfo.subcategory) },
                            { title: productInfo.title, href: null }] })),
                React.createElement(Grid, { item: true },
                    React.createElement(Grid, { container: true },
                        React.createElement(Grid, { item: true, xs: 5 },
                            React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '40px auto', gap: '10px' } },
                                React.createElement(Grid, { container: true, direction: "column", spacing: 1 }, productInfo.images.map(function (img) {
                                    return React.createElement(Grid, { item: true },
                                        React.createElement(ButtonBase, { onClick: function () { return setImage(img); } },
                                            React.createElement(Box, { component: "img", sx: { maxWidth: '100%', maxHeight: '100%', }, style: { aspectRatio: 3 / 4, objectFit: 'cover' }, src: img })));
                                })),
                                React.createElement(Box, { component: "img", sx: { maxWidth: '100%', maxHeight: '100%', }, alt: productInfo.title, src: image }))),
                        React.createElement(Divider, { orientation: "vertical", flexItem: true, style: { marginLeft: '10px', marginRight: '10px' } }),
                        React.createElement(Grid, { item: true, xs: 6 },
                            React.createElement(Grid, { container: true, justifyContent: "space-between", spacing: 2 },
                                React.createElement(Grid, { item: true, xs: 8, align: "left" },
                                    React.createElement(Typography, { variant: "h5" }, productInfo.title),
                                    React.createElement("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "baseline" } }, productInfo.tags.map(function (tag, idx) {
                                        return React.createElement(Typography, { variant: "caption", style: {
                                                // marginLeft: 10,
                                                marginRight: 10,
                                            } }, tag);
                                    }))),
                                React.createElement(Grid, { item: true, xs: 4, align: "right" }, productInfo.sold === 'true'
                                    ? React.createElement(Typography, { variant: "h5", style: { color: 'red' } }, "Sold")
                                    : React.createElement(Typography, { variant: "h5" },
                                        "$",
                                        parseFloat(productInfo.price).toFixed(2))),
                                React.createElement(Grid, { item: true, xs: 12 },
                                    React.createElement(Typography, { variant: "h6", color: "text.primary", align: "left" }, "Description"),
                                    React.createElement(Typography, { variant: "body2", color: "text.secondary", align: "left" }, productInfo.description)),
                                React.createElement(Grid, { item: true, xs: 12, align: "right" },
                                    React.createElement(AddToLikedList, { productID: productInfo.id, userID: props.userID }),
                                    React.createElement(CopyToClipboard, null)),
                                React.createElement(Grid, { item: true, xs: 12 },
                                    React.createElement(SellerCard, { userID: productInfo.seller }))))))))));
}
ProductPage.defaultProps = {
    productInfo: {
        category: "",
        subcategory: "",
        id: "",
        title: "",
        price: "",
        description: "",
        images: [],
        sold: 'false',
        seller: null,
        tags: [],
    },
    // // for demo
    // productInfo: {
    //   category: "Animal",
    //   subcategory: "Bird",
    //   title: "Flamingo Statue",
    //   price: "$4.99",
    //   description: "Description",
    //   images: [
    //     'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg',
    //     'https://www.aquariumofpacific.org/images/exhibits/Magnificent_Tree_Frog_900.jpg',
    //     'https://i.pinimg.com/564x/0e/81/6e/0e816e21de2f3ed8f12b3b8426a35bac.jpg',
    //     'https://i.pinimg.com/564x/ef/49/37/ef493790714a037449d62d3f2a6fccbf.jpg',
    //     'https://i.pinimg.com/564x/94/d4/ac/94d4acf4890271614be7018e7f035efe.jpg',
    //   ],
    //   sold: 'false',
    //   tags: ["used", "Artsy"],
    // },
};
export default ProductPage;
//# sourceMappingURL=ProductPage.js.map