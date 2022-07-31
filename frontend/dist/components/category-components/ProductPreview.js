import React from 'react';
// mui
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
function ProductPreview(props) {
    var colorPalette = ['#D7FFD7', '#E3EBFF', '#FEFFD7', '#FFE3E3', '#FFF6D7', '#F3DDF2', '#D5D6EA'];
    var numColors = colorPalette.length;
    return (React.createElement(Card, { style: {
            // backgroundColor: colorPalette[props.productInfo.description.length % colorPalette.length],
            background: 'linear-gradient(to right bottom, #ffffff, #c4f9ff)',
        } },
        React.createElement(CardActionArea, { disableRipple: true, href: "/product/" + props.productInfo.id },
            React.createElement(CardMedia, { component: "img", image: props.productInfo.pictures[0], alt: props.productInfo.name, style: { aspectRatio: 16 / 12 } }),
            React.createElement(CardContent, { sx: { padding: 1 }, style: { aspectRatio: 16 / 3 } },
                React.createElement(Grid, { container: true },
                    React.createElement(Grid, { item: true, xs: 8, align: "left" },
                        React.createElement(Typography, { variant: "subtitle1", style: { lineHeight: "24px" } }, props.productInfo.name)),
                    React.createElement(Grid, { item: true, xs: 4, align: "right" },
                        React.createElement(Typography, { variant: "subtitle1", style: { lineHeight: "24px" } },
                            "$",
                            parseFloat(props.productInfo.price).toFixed(2))),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "caption", color: "text.secondary", align: "left", sx: {
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                            }, style: { lineHeight: "16px" } }, props.productInfo.description)))))));
}
ProductPreview.defaultProps = {
    productId: 1,
    product: {
        id: 1,
        title: "Penguin",
        price: "$4.99",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus",
        pictures: "https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg",
    }
};
export default ProductPreview;
//# sourceMappingURL=ProductPreview.js.map