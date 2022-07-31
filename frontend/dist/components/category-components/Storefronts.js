import React from 'react';
import ProductPreview from './ProductPreview';
import Grid from '@mui/material/Grid';
function Storefront(props) {
    return (React.createElement(Grid, { container: true, spacing: 2, marginTop: 0, marginBottom: 5 }, props.products.map(function (item, idx) {
        return React.createElement(Grid, { item: true, key: idx, xs: 6, md: 4, lg: 3, display: "flex" },
            React.createElement(ProductPreview, { productInfo: item }));
    })));
}
Storefront.defaultProps = {
    products: [],
};
export default Storefront;
//# sourceMappingURL=Storefronts.js.map