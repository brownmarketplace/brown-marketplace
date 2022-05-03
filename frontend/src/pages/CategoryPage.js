import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import defaultProfilePicture from '../images/pfp.png'

import './boilerplate-page.css'
import './category-page.css'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

import Tag from '../components/category-components/Tag'
import PageBreadcrumbs from '../components/product-components/PageBreadcrumbs'
import Storefront from '../components/category-components/Storefronts'

function CategoryPage(props) {
  const { categoryTitle } = useParams()
  const subtags = ["Frog", "Cat", "Dog", "Seal", "Giraffe", "Red Panda", "Flamingo"]
  // const productIds = Array.from({ length: 15 }, (v, k) => k + 1)
  const [productIds, setProductIds] = useState(props.products) // get from database

  return (
    <div className="boilerplate">
      <BoilerplateHeader title={categoryTitle} userPicture={props.pfp} />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>

        <Grid container direction="column" justifyContent="center" spacing={1} paddingLeft="10%" paddingRight="10%">
          <Grid item>
            <PageBreadcrumbs />
          </Grid>
          <Grid item style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            <Typography variant="h2" align="left">{categoryTitle}</Typography>
            {/* {subtags.map((item) => <Tag tagName={item} setProductIds={setProductIds} />)}
            {subtags.map((item) => <Tag tagName={item} setProductIds={setProductIds} />)}
            {subtags.map((item) => <Tag tagName={item} setProductIds={setProductIds} />)} */}
          </Grid>
          <Grid item style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            {subtags.map((item) => <Tag tagName={item} setProductIds={setProductIds} />)}
            {subtags.map((item) => <Tag tagName={item} setProductIds={setProductIds} />)}
            {subtags.map((item) => <Tag tagName={item} setProductIds={setProductIds} />)}
          </Grid>
          <Grid item>
            <Storefront productIds={productIds} />
          </Grid>
        </Grid>

      </div>
      <Footer />
    </div>
  )
}

CategoryPage.defaultProps = {
  pfp: defaultProfilePicture,
  products: Array.from({ length: 15 }, (v, k) => k + 1),
}

export default CategoryPage