var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import { Box, Stack, Typography, Grid, Pagination } from '@mui/material';
// components
import ProductPreviewV2 from './ProductPreviewV2';
import TagButton from './TagButton';
import SortingDropdown from './SortingDropdown';
var NUMBER_PRODUCTS_PER_PAGE = 8;
export default function StorefrontV2(props) {
    var products = props.products, tags = props.tags;
    // filter by tags
    var _a = React.useState(new Set()), selectedTags = _a[0], setSelectedTags = _a[1];
    function toggleTag(tagName) {
        if (selectedTags.has(tagName)) {
            selectedTags.delete(tagName);
            setSelectedTags(new Set(selectedTags));
        }
        else {
            selectedTags.add(tagName);
            setSelectedTags(new Set(selectedTags));
        }
    }
    // product sorting
    var _b = React.useState(__spreadArray([], products, true)), sortedProducts = _b[0], setSortedProducts = _b[1];
    function numActiveTags(product) {
        return product.tags.reduce(function (counter, tag) { return counter + (selectedTags.has(tag) ? 1 : 0); }, 0);
    }
    React.useEffect(function () {
        var sorted = __spreadArray([], products, true).sort(function (a, b) { return -numActiveTags(a) + numActiveTags(b); });
        setSortedProducts(sorted);
    }, [products, selectedTags]);
    // TODO: Adjust the number of products to fit the display
    // pagination
    var _c = React.useState(1), page = _c[0], setPage = _c[1];
    var numPages = Math.ceil(products.length / NUMBER_PRODUCTS_PER_PAGE);
    return (React.createElement(Stack, { direction: { xs: "column", sm: "row" }, spacing: 1 },
        React.createElement(Box, null,
            React.createElement(SortingDropdown, null),
            React.createElement(Box, { sx: { width: "200px" } },
                React.createElement(Typography, { variant: "h5" }, "Filter by tags"),
                React.createElement(Stack, null, tags.map(function (tag, idx) {
                    return React.createElement(TagButton, { key: idx, title: tag, active: selectedTags.has(tag), onClick: function () { return toggleTag(tag); } });
                })))),
        React.createElement(Box, null,
            React.createElement(Stack, { alignItems: "center", spacing: 3 },
                React.createElement(Grid, { container: true, spacing: 3 }, sortedProducts.slice((page - 1) * NUMBER_PRODUCTS_PER_PAGE, page * NUMBER_PRODUCTS_PER_PAGE).map(function (productInfo, idx) {
                    return React.createElement(Grid, { item: true, key: idx, xs: 6, md: 4, lg: 3, display: "flex" },
                        React.createElement(ProductPreviewV2, { productInfo: productInfo, selectedTags: selectedTags, tagOnClick: toggleTag }));
                })),
                React.createElement(Pagination, { count: numPages, page: page, onChange: function (event, value) { setPage(value); } })))));
}
;
StorefrontV2.defaultProps = {
    products: Array(5).fill([
        {
            id: 1,
            name: "Luxury Table Set",
            price: 669.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
            pictures: ["https://assets.weimgs.com/weimgs/ab/images/wcm/products/202217/0067/tripod-dining-table-walnut-c.jpg"],
            tags: ["Furniture", "Vintage", "Nature", "Decoration"],
        },
        {
            id: 2,
            name: "Rocking Chair",
            price: 6.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
            pictures: ["https://cdn.shopify.com/s/files/1/2505/7782/products/ND-15-SU_Nanny_4569_1200x.jpg?v=1647915690"],
            tags: ["Furniture", "Vintage", "Nature", "Decoration", "Rocking Chair"],
        },
        {
            id: 3,
            name: "Leather Sofa",
            price: 669.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
            pictures: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxr5qIE2fBN0dfocC7TQ3VV49Y0-fE0lzexGpAf_1BqdkWrEOzVc9ki8_h1ids-xrglT4&usqp=CAU"],
            tags: ["Furniture", "Vintage", "Decoration", "Sofa"],
        },
        {
            id: 4,
            name: "Free Lamp",
            price: 0.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            pictures: ["https://images.dunelm.com/30674209.jpg?$standardplayerdefault$&img404=noimagedefault"],
            tags: ["Furniture", "Free"],
        },
        {
            id: 5,
            name: "Carpet",
            price: 69.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui.",
            pictures: ["https://stylesatlife.com/wp-content/uploads/2021/03/Best-Floor-Carpet-Designs.jpg"],
            tags: ["Furniture"],
        },
    ]).flat(),
    tags: ["Furniture", "Vintage", "Decoration", "Rocking Chair", "Sofa", "Nature", "Free"],
};
//# sourceMappingURL=StorefrontsV2.js.map