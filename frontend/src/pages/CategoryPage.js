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
import Typography from '@mui/material/Typography'

// database
import { ref, get, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"
import database from '../backend/Database/DBInstance'

function CategoryPage(props) {
  const { category, subcategory } = useParams()
  const [tag, setTag] = useState(null)
  const [tags, setTags] = useState([])
  const [products, setProducts] = useState([])
  const [filterByTag, setFilterByTag] = useState(() => () => true)

  // customize breadcrumbs based on url parameters
  const breadcrumbs = category
    ? (subcategory
      ? [{ title: "All Products", href: "/category" },
      { title: category, href: `/category/${category}` },
      { title: subcategory, href: null }]
      : [{ title: "All Products", href: "/category" },
      { title: category, href: null }])
    : [{ title: "All Products", href: "/category" }]

  // customize title based on url parameters
  const title = category
    ? (subcategory
      ? subcategory
      : category)
    : 'All Products'

  // read from database
  const getTags = () => {
    let tags = new Set()
    products.forEach(product => {
      Object.keys(product.tags).forEach(tag => tags.add(tag))
    })
    setTags(Array.from(tags))
  }

  const getAllProducts = () => {
    onValue(ref(database, 'products'), (snapshot) => {
      let products = []
      snapshot.forEach(function (childSnapshot) {
        products.push(childSnapshot.val())
      })
      setProducts(products)
    })
  }

  const getProductsByCategory = () => {
    const q = query(ref(database, 'products'), orderByChild('category'), equalTo(category))
    get(q).then(snapshot => {
      let products = []
      snapshot.forEach(function (childSnapshot) {
        products.push(childSnapshot.val())
      })
      setProducts(products)
    })
  }

  const getProductsBySubcategory = () => {
    const q = query(ref(database, 'products'), orderByChild('sub-category'), equalTo(subcategory))
    get(q).then(snapshot => {
      let products = []
      snapshot.forEach(function (childSnapshot) {
        products.push(childSnapshot.val())
      })
      setProducts(products)
    })
  }

  // fetch data once the page is first loaded
  useEffect(() => {
    category
      ? (subcategory
        ? getProductsBySubcategory()
        : getProductsByCategory())
      : getAllProducts()
    console.log("fetching data")
  }, [])

  // gather all tags once the data is fetched
  useEffect(() => {
    getTags()
  }, [products])

  // filter products by tag
  useEffect(() => {
    tag == null
      ? setFilterByTag(() => () => true)
      : setFilterByTag(() => (item) => item.tags[tag] === 'true')
  }, [tag])

  return (
    <div className="boilerplate">
      <BoilerplateHeader title={"Brown Marketplace"} userPicture={props.pfp} />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Grid container direction="column" justifyContent="center" spacing={1} paddingLeft="10%" paddingRight="10%">
          <Grid item>
            <PageBreadcrumbs path={breadcrumbs} />
          </Grid>
          <Grid item style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            <Typography variant="h2" align="left"
            // style={{ textTransform: 'capitalize' }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            <Tag key={0} tagName={"All"} setTag={() => setTag(null)} />
            {tags.map((item, idx) => <Tag key={idx} tagName={item} setTag={() => setTag(item)} />)}
          </Grid>
          <Grid item>
            <Storefront products={products.filter(filterByTag)} />
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