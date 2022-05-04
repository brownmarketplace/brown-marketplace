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
  const { category, subcategory } = useParams()
  const subtags = ["Frog", "Cat", "Dog", "Seal", "Giraffe", "Red Panda", "Flamingo"]

  const productIds = Array.from({ length: 15 }, (v, k) => k + 1)
  const [tag, setTag] = useState(null)
  // const [productIds, setProductIds] = useState(props.products) // get from database

  return (
    <div className="boilerplate">
      <BoilerplateHeader title={"Brown Marketplace"} userPicture={props.pfp} />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>

        <Grid container direction="column" justifyContent="center" spacing={1} paddingLeft="10%" paddingRight="10%">
          <Grid item>
            <PageBreadcrumbs path={
              subcategory
                ? [{ title: "Home", href: "/home" },
                { title: category, href: `/category/${category}` },
                { title: subcategory, href: null }]
                : [{ title: "Home", href: "/home" },
                { title: category, href: null }]} />
          </Grid>
          <Grid item style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            <Typography variant="h2" align="left" style={{ textTransform: 'capitalize' }}>
              {subcategory == null ? category : subcategory}
            </Typography>
            <Typography variant="h2" align="left">
              {tag}
            </Typography>
          </Grid>
          <Grid item style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            {/* {subtags.map((item) => 
              item.containTag(tag)
              ? <Tag tagName={item} setTag={setTag}/>
              : null 
            )} */}
            {subtags.map((item) => <Tag tagName={item} setTag={setTag} />)}
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
}

export default CategoryPage