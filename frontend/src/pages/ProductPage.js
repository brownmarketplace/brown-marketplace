import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import Storefront from '../components/category-components/Storefronts'
import PageBreadcrumbs from '../components/product-components/PageBreadcrumbs'
import AddToWishList from '../components/product-components/AddToWishList'
import CopyToClipboard from '../components/product-components/CopyToClipboard'

import './boilerplate-page.css'
import './product-page.css'

import defaultProfilePicture from '../images/pfp.png'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button';
import { Paper } from '@mui/material'

function ProductPage(props) {
  const { productId } = useParams()
  const altImage = [
    'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg',
    'https://www.aquariumofpacific.org/images/exhibits/Magnificent_Tree_Frog_900.jpg',
    'https://i.pinimg.com/564x/0e/81/6e/0e816e21de2f3ed8f12b3b8426a35bac.jpg',
    'https://i.pinimg.com/564x/ef/49/37/ef493790714a037449d62d3f2a6fccbf.jpg',
    'https://i.pinimg.com/564x/94/d4/ac/94d4acf4890271614be7018e7f035efe.jpg',
  ]

  // product info
  const [image, setImage] = useState("https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg")
  const title = "Product id: " + productId // get product name from API
  const price = "$" + "4.99"
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus odio venenatis convallis congue. Fusce condimentum imperdiet justo. Aenean ut ligula in arcu facilisis convallis non fermentum purus. Duis elementum volutpat velit eu venenatis. Nam vitae iaculis odio. Nam viverra ante et iaculis semper. Ut congue magna eu sem commodo dignissim."
  const details = "Size: gigantic\n\n Color: pink"

  // seller info
  const sellerUsername = "username"
  const sellerNumber = "(401)-999-9999"
  const sellerEmail = "username@brown.edu"
  const sellerSocial = "username@ig"

  // recommendation
  const productIds = Array.from({ length: 30 }, (v, k) => k + 1)

  // action listeners
  const contactSeller = () => {
    console.log('contact seller');
  }

  // util
  const bg = "https://img.freepik.com/free-vector/pattern-geometric-line-circle-abstract-seamless-blue-line_60284-53.jpg?w=2000"

  return (
    <div className="boilerplate">
      <BoilerplateHeader title={""} userPicture={props.pfp} />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>

        {/* <Paper style={{ backgroundImage: `url(${bg})` }}>
        </Paper> */}

        <Grid container justifyContent="center" spacing={1} paddingLeft="10%" paddingRight="10%">
          <Grid item xs={12}>
            <PageBreadcrumbs />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" align="left">{title}</Typography>
          </Grid>
          <Grid item xs={4}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px auto', gap: '10px' }}>
              <Grid container direction="column" spacing={1}>
                {altImage.map((img) =>
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
                alt={title}
                src={image} />
            </div>
          </Grid>
          <Grid item xs={8}>
            <Grid container justifyContent="space-between" padding={1} spacing={2}>
              <Grid item xs={8} align="left">
                <Typography variant="h4">{title}</Typography>
              </Grid>
              <Grid item xs={4} align="right">
                <Typography variant="h4">{price}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="text.primary" align="left">Description</Typography>
                <Typography variant="body2" color="text.secondary" align="left">{description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="text.primary" align="left">Detail</Typography>
                <Typography variant="body2" color="text.secondary" align="left">{details}</Typography>
              </Grid>
              <Grid item xs={12} align="right">
                {/* <Button variant="contained" onClick={contactSeller}>Contact Seller</Button> */}
                <AddToWishList />
                <CopyToClipboard />
              </Grid>
              <Grid item xs={12}>
                <Card>
                  {/* TODO: account card */}
                </Card>
                <Typography variant="h6" color="text.primary">Seller Information</Typography>
                <Typography variant="body1">{sellerUsername}</Typography>
                <Typography variant="body1">{sellerNumber}</Typography>
                <Typography variant="body1">{sellerEmail}</Typography>
                <Typography variant="body1">{sellerSocial}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" paddingTop={4}>Similar Items</Typography>
          </Grid>
          <Grid item xs={12}>
            <Storefront productIds={productIds} />
          </Grid>
        </Grid>

      </div>
      <Footer />
    </div >
  )
}

ProductPage.defaultProps = {
  title: "placeholder",
  pfp: defaultProfilePicture
}

export default ProductPage