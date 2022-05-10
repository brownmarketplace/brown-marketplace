import React, { useState, useEffect } from 'react';

// components
import AddToWishList from '../product-components/AddToWishList'
import CopyToClipboard from '../product-components/CopyToClipboard';

// mui
import { Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

// database
import { ref, get, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../../backend/Database/DBInstance';

function ProductPreview(props) {
  // product info
  const [productInfo, setProductInfo] = useState(props.product)

  // read from database
  const getProductInfo = () => {
    onValue(ref(database, 'products/' + props.productId), (snapshot) => {
      const product = snapshot.val()
      if (product != null) {
        setProductInfo(
          {
            id: props.productId,
            title: product.name,
            price: product.price,
            description: product.description,
            // images: product.images,
            image: 'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg',
          })
      }
    })
  }

  useEffect(() => {
    getProductInfo()
  }, []);

  // // demo
  // const images = [
  //     'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg',
  //     'https://www.aquariumofpacific.org/images/exhibits/Magnificent_Tree_Frog_900.jpg',
  //     'https://i.pinimg.com/564x/0e/81/6e/0e816e21de2f3ed8f12b3b8426a35bac.jpg',
  //     'https://i.pinimg.com/564x/ef/49/37/ef493790714a037449d62d3f2a6fccbf.jpg',
  //     'https://i.pinimg.com/564x/94/d4/ac/94d4acf4890271614be7018e7f035efe.jpg',
  // ]image

  return (
    <Card style={{
      border: "none",
      boxShadow: "none",
      // aspectRatio: 16 / 17,
    }}>
      <CardActionArea disableRipple href={"/product/" + props.productId}>
        <CardMedia
          component="img"
          image={productInfo.image}
          style={{ aspectRatio: 16 / 12 }}
        />
        <CardContent
          sx={{ padding: 1 }}
          style={{ aspectRatio: 16 / 3 }}
        >
          <Grid container>
            <Grid item xs={8} align="left">
              <Typography variant="subtitle1">{productInfo.title}</Typography>
            </Grid>
            <Grid item xs={4} align="right">
              <Typography variant="subtitle1">{productInfo.price}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary" align="left"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                }} >
                {productInfo.description}
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
  product: {
    id: 1,
    title: "Penguin",
    price: "$4.99",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus",
    image: "https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg",
  }
}

export default ProductPreview;
