import React from 'react'
import { useParams } from 'react-router-dom'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import defaultProfilePicture from '../images/pfp.png'

import Tag from '../components/catergory-components/Tag'
import ProductPreview from '../components/catergory-components/ProductPreview'

import './boilerplate-page.css'
import './category-page.css'

import { ImageList, ImageListItem } from '@mui/material';

function CategoryPage(props) {
  const { categoryTitle } = useParams()
  const subtags = ["tags1", "tags2", "tags2"]
  const productIds = Array.from({ length: 15 }, (v, k) => k + 1)

  return (
    <div className="boilerplate">
      <BoilerplateHeader title={categoryTitle} userPicture={props.pfp} />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <div className="category-header">
          {/* <div className="category-title">{categoryTitle}</div> */}
          <div className="category-title">{categoryTitle}</div>
          <ul className="tag-holder">
            {subtags.map((e) => <li><Tag tagName={e} /></li>)}
          </ul>
        </div>
        {/* <ImageList cols={5} >
          {productIds.map((e) =>
            <ImageListItem>
              <ProductPreview productId={e} />
            </ImageListItem>)}
        </ImageList> */}
        <div className="category-contents">
          <ul className="product-holder">
            {productIds.map((e) => <li><ProductPreview productId={e} /></li>)}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

CategoryPage.defaultProps = {
  title: "placeholder",
  pfp: defaultProfilePicture
}

export default CategoryPage