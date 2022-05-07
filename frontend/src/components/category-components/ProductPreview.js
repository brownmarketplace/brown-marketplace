import React from 'react';

import { Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

import AddToWishList from '../product-components/AddToWishList'
import CopyToClipboard from '../product-components/CopyToClipboard';

function ProductPreview(props) {
    const productId = props.productId
    // product info
    const image = 'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg'
    const title = "product " + props.productId
    const price = "$4.99"
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus odio venenatis convallis congue. Fusce condimentum imperdiet justo. Aenean ut ligula in arcu facilisis convallis non fermentum purus. Duis elementum volutpat velit eu venenatis. Nam vitae iaculis odio. Nam viverra ante et iaculis semper. Ut congue magna eu sem commodo dignissim."
    // const shortDescription = description.substring(0, 50) + "..."
    const shortDescription = description.substring(0, (props.productId - 1) * 15)

    // demo
    const images = [
        'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg',
        'https://www.aquariumofpacific.org/images/exhibits/Magnificent_Tree_Frog_900.jpg',
        'https://i.pinimg.com/564x/0e/81/6e/0e816e21de2f3ed8f12b3b8426a35bac.jpg',
        'https://i.pinimg.com/564x/ef/49/37/ef493790714a037449d62d3f2a6fccbf.jpg',
        'https://i.pinimg.com/564x/94/d4/ac/94d4acf4890271614be7018e7f035efe.jpg',
    ]

    return (
        <Card style={{
            border: "none",
            boxShadow: "none",
            // aspectRatio: 4 / 5,
        }}>
            <CardActionArea disableRipple href={"/product/" + productId}>
                <CardMedia
                    component="img"
                    image={images[props.productId % 5]}
                    style={{ aspectRatio: 16 / 12 }}
                // style={{ aspectRatio: 4 / 3 }}
                />
                <CardContent
                    sx={{ padding: 1 }}
                    style={{ aspectRatio: 16 / 3 }}
                // style={{ aspectRatio: 4 / 2 }}
                >
                    <Grid container>
                        <Grid item xs={8} align="left">
                            <Typography variant="subtitle1">{title}</Typography>
                        </Grid>
                        <Grid item xs={4} align="right">
                            <Typography variant="subtitle1">{price}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary" align="left"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical',
                                }} ƒ>
                                {shortDescription}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            {/* <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: 0,
                }}
            >
                <AddToWishList />
                <CopyToClipboard />
            </CardActions> */}
        </Card>
    );
}

ProductPreview.defaultProps = {
    productId: 1,
}

export default ProductPreview;
