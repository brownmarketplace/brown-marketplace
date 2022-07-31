import * as React from 'react';
import { Box, Stack, Typography, Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
// components
import PageBreadcrumbsV2 from '../components/search-result-components/PageBreadcrumbsV2';
import TagV2 from '../components/search-result-components/TagV2';
import SellerCardV2 from '../components/product-v2-components/SellerCardV2';
import ProductSlideshow from '../components/product-v2-components/ProductSlideshow';
import AddToFavoriteButton from '../components/product-v2-components/AddToFavoriteButton';
import ShareButton from '../components/product-v2-components/ShareButton';
function BuyNow() {
    return (React.createElement(Button, { variant: "outlined", disableRipple: true, sx: {
            borderRadius: "1000px", textTransform: "none",
            color: "inherit",
            borderColor: "inherit",
            flexGrow: 1,
        } }, "Buy now"));
}
function Message() {
    return (React.createElement(Button, { variant: "outlined", disableRipple: true, sx: {
            borderRadius: "1000px", textTransform: "none",
            color: "inherit",
            borderColor: "inherit",
            flexGrow: 1,
        } }, "Message"));
}
export default function ProductPageV2(props) {
    var _a;
    // get url parameters
    var productId = useParams().productId;
    var path = [{ title: "Home", href: "/home" },
        { title: props.productInfo.category, href: "/" + props.productInfo.category },
        { title: props.productInfo.subcategory, href: "/" + props.productInfo.category + "/" + props.productInfo.subcategory },
        { title: props.productInfo.name, href: null }];
    return (React.createElement(Box, { sx: { paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" } },
        React.createElement(Stack, { spacing: 1 },
            React.createElement(PageBreadcrumbsV2, { path: path }),
            React.createElement(Grid, { container: true, direction: { xs: "column", sm: "column", md: "row" }, justifyContent: "space-between" },
                React.createElement(Grid, { item: true, xs: 6 },
                    React.createElement(Stack, { spacing: 1 },
                        React.createElement(ProductSlideshow, null),
                        React.createElement(Stack, { direction: { xs: "column", sm: "row" }, spacing: 1, justifyContent: "space-between", alignItems: "center" },
                            React.createElement(SellerCardV2, { sellerInfo: props.sellerInfo }),
                            React.createElement(Stack, { direction: "row", justifyContent: "space-between", spacing: 1 },
                                React.createElement(AddToFavoriteButton, null),
                                React.createElement(ShareButton, null))))),
                React.createElement(Grid, { item: true, xs: 6 },
                    React.createElement(Stack, { spacing: 1, sx: {
                            paddingLeft: { xs: 0, md: "25px" },
                            paddingRight: { xs: 0, md: "25px" },
                            paddingTop: { xs: "25px", md: 0 },
                            paddingBottom: { xs: "25px", md: 0 },
                        } },
                        React.createElement(Typography, { variant: "h4" }, props.productInfo.name),
                        React.createElement(Typography, { variant: "h5", color: "primary" },
                            "$",
                            props.productInfo.price.toFixed(2)),
                        React.createElement(Stack, { direction: "row", justifyContent: "space-between", spacing: 1 },
                            React.createElement(BuyNow, null),
                            React.createElement(Message, null)),
                        React.createElement(Typography, { variant: "h6" }, "Tags"),
                        React.createElement(Box, { sx: { display: "flex", flexWrap: "wrap", alignItems: "baseline" } }, (_a = props.productInfo.tags) === null || _a === void 0 ? void 0 : _a.map(function (tag, idx) { return React.createElement(TagV2, { key: idx, title: tag, onClick: function () { console.log("Navigate to " + tag); } }); })),
                        React.createElement(Typography, { variant: "h6" }, "Description"),
                        React.createElement(Typography, { variant: "body2" }, props.productInfo.description)))))));
}
;
ProductPageV2.defaultProps = {
    productInfo: {
        id: 1,
        name: "Product Title",
        price: 69.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
        pictures: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxr5qIE2fBN0dfocC7TQ3VV49Y0-fE0lzexGpAf_1BqdkWrEOzVc9ki8_h1ids-xrglT4&usqp=CAU"],
        category: "Category",
        subcategory: "Subcategory",
        tags: ["Furniture", "Vintage", "Decoration", "Sofa"],
    },
    sellerInfo: {
        profilePic: "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg",
        name: "Josiah Carberry",
        postDate: "July 2, 2022",
    },
};
//# sourceMappingURL=ProductPageV2.js.map