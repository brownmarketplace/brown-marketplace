import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './boilerplate-page.css'
import './category-page.css'

// components
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import Tag from '../components/category-components/Tag'
import PageBreadcrumbs from '../components/product-components/PageBreadcrumbs'
import Storefront from '../components/category-components/Storefronts'

// mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

// database
import { ref, get, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../backend/Database/DBInstance'

function CategoryPage(props) {
  const { category, subcategory } = useParams()
  const [tag, setTag] = useState(null)
  const [tags, setTags] = useState([])
  // const [productIDs, setProductIDs] = useState([])
  const [products, setProducts] = useState([])

  const breadcrumbs = category
    ? (subcategory
      ? [{ title: "All Products", href: "/category" },
      { title: category, href: `/category/${category}` },
      { title: subcategory, href: null }]
      : [{ title: "All Products", href: "/category" },
      { title: category, href: null }])
    : [{ title: "All Products", href: "/category" }]

  const title = category
    ? (subcategory
      ? subcategory
      : category)
    : 'All Products'

  // read from database
  const getTags = () => {
    setTags(props.tags)
  }

  const getAllProducts = () => {
    onValue(ref(database, 'products'), (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        // setProductIDs(props.productIDs)
        console.log(childSnapshot.val())
        console.log("getting all products")
      })
    })
  }

  const getProductsByCategory = () => {
    onValue(ref(database, 'products'), (snapshot) => {
      console.log(snapshot.val())
      
      // snapshot.forEach(function (childSnapshot) {
      //   // setProductIDs(props.productIDs)
      //   console.log(childSnapshot.val())
      //   console.log("getting cat products")
      // })
    })
  }

  const getProductsBySubcategory = () => {
    onValue(ref(database, 'products'), (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        // setProductIDs(props.productIDs)
        console.log(childSnapshot.val())
        console.log("getting sub products")
      })
    })
  }

  useEffect(() => {
    getTags()
    category
    ? (subcategory
      ? getProductsBySubcategory()
      : getProductsByCategory())
    : getAllProducts()
  }, []);

  // filter products by tag maybe?
  useEffect(() => {

  }, [tag])

  return (
    <div className="boilerplate">
      <BoilerplateHeader title={"Brown Marketplace"} userPicture={props.pfp} />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h1>{props.userID}</h1>
        <Grid container direction="column" justifyContent="center" spacing={1} paddingLeft="10%" paddingRight="10%">
          <Grid item>
            <PageBreadcrumbs path={breadcrumbs} />
          </Grid>
          <Grid item style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            <Typography variant="h2" align="left" style={{ textTransform: 'capitalize' }}>
              {title}
            </Typography>
          </Grid>
          <Grid item style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            {/* {products.map((item) => 
              item.containTag(tag)
              ? <Tag tagName={item} setTag={setTag}/>
              : null 
            )} */}
            {tags.map((item, idx) => <Tag key={idx} tagName={item} setTag={setTag} />)}
          </Grid>
          <Grid item>
            {/* <Storefront productIDs={productIDs} /> */}
            <Storefront />
          </Grid>
        </Grid>

      </div>
      <Footer />
    </div>
  )
}

CategoryPage.defaultProps = {
  tags: ["Frog", "Cat", "Dog", "Seal", "Giraffe", "Red Panda", "Flamingo"],
  productIDs: Array.from({ length: 15 }, (v, k) => k + 1),
}

export default CategoryPage