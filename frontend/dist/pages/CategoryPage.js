import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './boilerplate-page.css';
import './category-page.css';
// components
import BoilerplateHeader from '../components/BoilerplateHeader';
import Tag from '../components/category-components/Tag';
import PageBreadcrumbs from '../components/product-components/PageBreadcrumbs';
import Storefront from '../components/category-components/Storefronts';
// mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// database
import { ref, get, onValue, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../backend/Database/DBInstance';
function CategoryPage(props) {
    var _a = useParams(), category = _a.category, subcategory = _a.subcategory;
    var _b = useState(null), tag = _b[0], setTag = _b[1];
    var _c = useState([]), tags = _c[0], setTags = _c[1];
    var _d = useState([]), products = _d[0], setProducts = _d[1];
    var _e = useState(function () { return function () { return true; }; }), filterByTag = _e[0], setFilterByTag = _e[1];
    // customize breadcrumbs based on url parameters
    var breadcrumbs = category
        ? (subcategory
            ? [{ title: "All Products", href: "/category" },
                { title: category, href: "/category/".concat(category) },
                { title: subcategory, href: null }]
            : [{ title: "All Products", href: "/category" },
                { title: category, href: null }])
        : [{ title: "All Products", href: "/category" }];
    // customize title based on url parameters
    var title = category
        ? (subcategory
            ? subcategory
            : category)
        : 'All Products';
    // read from database
    var getTags = function () {
        var tags = new Set();
        products.forEach(function (product) {
            Object.keys(product.tags).forEach(function (tag) { return tags.add(tag); });
        });
        setTags(Array.from(tags));
    };
    var getAllProducts = function () {
        onValue(ref(database, 'products'), function (snapshot) {
            var products = [];
            snapshot.forEach(function (childSnapshot) {
                products.push(childSnapshot.val());
            });
            setProducts(products);
        });
    };
    var getProductsByCategory = function () {
        var q = query(ref(database, 'products'), orderByChild('category'), equalTo(category));
        get(q).then(function (snapshot) {
            var products = [];
            snapshot.forEach(function (childSnapshot) {
                products.push(childSnapshot.val());
            });
            setProducts(products);
        });
    };
    var getProductsBySubcategory = function () {
        var q = query(ref(database, 'products'), orderByChild('sub-category'), equalTo(subcategory));
        get(q).then(function (snapshot) {
            var products = [];
            snapshot.forEach(function (childSnapshot) {
                products.push(childSnapshot.val());
            });
            setProducts(products);
        });
    };
    // fetch data once the page is first loaded
    useEffect(function () {
        category
            ? (subcategory
                ? getProductsBySubcategory()
                : getProductsByCategory())
            : getAllProducts();
        console.log("fetching data");
    }, []);
    // gather all tags once the data is fetched
    useEffect(function () {
        getTags();
    }, [products]);
    // filter products by tag
    useEffect(function () {
        tag == null
            ? setFilterByTag(function () { return function () { return true; }; })
            : setFilterByTag(function () { return function (item) { return item.tags[tag] === 'true'; }; });
    }, [tag]);
    return (React.createElement("div", { className: "boilerplate" },
        React.createElement(BoilerplateHeader, { title: "Brown Marketplace", userPicture: props.pfp, userID: props.userID }),
        React.createElement("div", { style: { textAlign: 'center', marginTop: '30px' } },
            React.createElement(Grid, { container: true, direction: "column", justifyContent: "center", spacing: 1, paddingLeft: "10%", paddingRight: "10%" },
                React.createElement(Grid, { item: true },
                    React.createElement(PageBreadcrumbs, { path: breadcrumbs })),
                React.createElement(Grid, { item: true, style: { display: "flex", flexWrap: "wrap", alignItems: "baseline" } },
                    React.createElement(Typography, { variant: "h2", align: "left" }, title)),
                React.createElement(Grid, { item: true, style: { display: "flex", flexWrap: "wrap", alignItems: "baseline" } },
                    React.createElement(Tag, { key: 0, tagName: "All", setTag: function () { return setTag(null); } }),
                    tags.map(function (item, idx) { return React.createElement(Tag, { key: idx, tagName: item, setTag: function () { return setTag(item); } }); })),
                React.createElement(Grid, { item: true },
                    React.createElement(Storefront, { products: products.filter(filterByTag) }))))));
}
CategoryPage.defaultProps = {
    tags: ["Frog", "Cat", "Dog", "Seal", "Giraffe", "Red Panda", "Flamingo"],
    productIDs: Array.from({ length: 15 }, function (v, k) { return k + 1; }),
};
export default CategoryPage;
//# sourceMappingURL=CategoryPage.js.map