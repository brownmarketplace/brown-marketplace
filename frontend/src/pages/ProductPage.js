import React from 'react'
import { useParams } from "react-router-dom"

import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import ProductPreview from '../components/catergory-components/ProductPreview'

import './boilerplate-page.css'
import './product-page.css'

import defaultProfilePicture from '../images/pfp.png'
import placeholder from '../images/product-placeholder.png'

function ProductPage(props) {
  const { productId } = useParams()

  // product info
  const image = placeholder
  const title = "Product id: " + productId // get product name from API
  const price = "$" + "4.99"
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus odio venenatis convallis congue. Fusce condimentum imperdiet justo. Aenean ut ligula in arcu facilisis convallis non fermentum purus. Duis elementum volutpat velit eu venenatis. Nam vitae iaculis odio. Nam viverra ante et iaculis semper. Ut congue magna eu sem commodo dignissim."
  const details = "";
  
  // seller info
  const sellerUsername = "username"
  const sellerNumber = "(401)-999-999"
  const sellerEmail = "username@brown.edu"
  const sellerSocial = "username@ig"

  // recommendation
  const productIds = Array.from({length:4},(v,k)=>k+1)
  
  return (
    <div className="boilerplate">
      <BoilerplateHeader title={title} userPicture={props.pfp} />
      <div style={{ textAlign: 'center', marginTop: '30px' }}>

        <div className="product-contents">
          <div className="product-image">
            <img className="preview-image" src={image} />
          </div>
          <div className="right-column">
            <div className="product-info">
              <div className="product-header">
                <div className="product-title">{title}</div>
                <div className="product-price">{price}</div>
              </div>
              <div className="product-description">&emsp;{description}</div>
              <div className="product-details">{details}</div>
              <button className="add-to-wish-list">add to wish list</button>
              <button className="share-button">share</button>
            </div>
            <div className="seller-info">
              Seller Information
              <div className="seller-username">{sellerUsername}</div>
              <div className="seller-phone-number">{sellerNumber}</div>
              <div className="seller-email">{sellerEmail}</div>
              <div className="seller-social">{sellerSocial}</div>
            </div>
          </div>
        </div>

        <div className="category-contents">
          Recommendation
          <ul className="product-holder">
            {productIds.map((e) => <li><ProductPreview productId={e} /></li>)}
          </ul>
        </div>

      </div>
      <Footer />
    </div>
  )
}

ProductPage.defaultProps = {
  title: "placeholder",
  pfp: defaultProfilePicture
}

export default ProductPage