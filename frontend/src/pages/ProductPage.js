import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"

// components
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import PageBreadcrumbs from '../components/product-components/PageBreadcrumbs'
import AddToWishList from '../components/product-components/AddToWishList'
import CopyToClipboard from '../components/product-components/CopyToClipboard'
import Storefront from '../components/category-components/Storefronts'

import './boilerplate-page.css'

// mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'

// database
import { ref, get, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../backend/Database/DBInstance'

function ProductPage(props) {
  // get url parameters
  const { productId } = useParams()
  // page navigation
  const navigate = useNavigate();
  // product info
  const [image, setImage] = useState(props.productInfo.images[0])
  const [productInfo, setProductInfo] = useState(props.productInfo)
  // recommendation
  const [recommendation, setRecommendation] = useState([])

  // read from database
  const getProductInfo = () => {
    console.log('reading from firebase database')
    onValue(ref(database, 'products/' + productId), (snapshot) => {
      const product = snapshot.val()
      // setProductInfo(product)
      if (product != null) {
        setProductInfo(
          {
            // category: product.categories,
            category: "Animal",
            subcategory: "Bird",
            title: product.name,
            price: product.price,
            description: product.description,
            // images: product.images,
            images: [
              'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg',
              'https://www.aquariumofpacific.org/images/exhibits/Magnificent_Tree_Frog_900.jpg',
              'https://i.pinimg.com/564x/0e/81/6e/0e816e21de2f3ed8f12b3b8426a35bac.jpg',
              'https://i.pinimg.com/564x/ef/49/37/ef493790714a037449d62d3f2a6fccbf.jpg',
              'https://i.pinimg.com/564x/94/d4/ac/94d4acf4890271614be7018e7f035efe.jpg',
            ],
            seller: product.seller,
            sold: product.sold,
          })
      }
    })
  }

  const getRecommendation = () => {
    console.log('reading from spark server')
    setRecommendation(Array.from({ length: 5 }, (v, k) => k + 1))
  }

  // retrieve data from database
  useEffect(() => {
    getProductInfo()
    getRecommendation()
  }, [])

  // action listeners
  const contactSeller = () => {
    navigate(`/profile/${productInfo.seller}`);
  }

  return (
    <div className="boilerplate">
      <BoilerplateHeader title={"Brown Marketplace"} userPicture={props.pfp} />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>

        <Grid container direction="column" justifyContent="center" spacing={1} paddingLeft="10%" paddingRight="10%">
          <Grid item>
            <PageBreadcrumbs path={
              [{ title: "Home", href: "/home" },
              { title: productInfo.category, href: `/category/${productInfo.category}` },
              { title: productInfo.subcategory, href: `/category/${productInfo.category}/${productInfo.subcategory}` },
              { title: productInfo.title, href: null }]} />
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs>
                <div style={{ display: 'grid', gridTemplateColumns: '40px auto', gap: '10px' }}>
                  <Grid container direction="column" spacing={1}>
                    {productInfo.images.map((img) =>
                      <Grid item>
                        <ButtonBase onClick={() => setImage(img)}>
                          <Box
                            component="img"
                            sx={{ maxWidth: '100%', maxHeight: '100%', }}
                            style={{ aspectRatio: 3 / 4, objectFit: 'cover' }}
                            src={img} />
                        </ButtonBase>
                      </Grid>)}
                  </Grid>
                  <Box
                    component="img"
                    sx={{ maxWidth: '100%', maxHeight: '100%', }}
                    alt={productInfo.title}
                    src={image} />
                </div>
              </Grid>
              <Divider orientation="vertical" flexItem style={{ marginLeft: '10px', marginRight: '10px' }} />
              <Grid item xs>
                <Grid container justifyContent="space-between" spacing={2}>
                  <Grid item xs={8} align="left">
                    <Typography variant="h4">{productInfo.title}</Typography>
                  </Grid>
                  <Grid item xs={4} align="right">
                    <Typography variant="h4">{productInfo.price}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="text.primary" align="left">Description</Typography>
                    <Typography variant="body2" color="text.secondary" align="left">{productInfo.description}</Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                    {productInfo.sold
                      ? <Button variant="contained" disabled color="error">Sold</Button>
                      : <Button variant="contained" onClick={contactSeller}>Contact Seller</Button>}
                    <AddToWishList productID={1} userID={null} />
                    <CopyToClipboard />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: '10px', marginButtom: '10px' }} />
          <Grid item>
            <Typography variant="h4" align='left'>Similar Items</Typography>
          </Grid>
          <Grid item>
            <Storefront productIds={recommendation} />
          </Grid>
        </Grid>

      </div>
      <Footer />
    </div >
  )
}

ProductPage.defaultProps = {
  productInfo: {
    category: "Animal",
    subcategory: "Bird",
    title: "Flamingo Statue",
    price: "$4.99",
    description: "Description",
    images: [
      'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg',
      'https://www.aquariumofpacific.org/images/exhibits/Magnificent_Tree_Frog_900.jpg',
      'https://i.pinimg.com/564x/0e/81/6e/0e816e21de2f3ed8f12b3b8426a35bac.jpg',
      'https://i.pinimg.com/564x/ef/49/37/ef493790714a037449d62d3f2a6fccbf.jpg',
      'https://i.pinimg.com/564x/94/d4/ac/94d4acf4890271614be7018e7f035efe.jpg',
    ],
    sold: false,
  },
}

export default ProductPage