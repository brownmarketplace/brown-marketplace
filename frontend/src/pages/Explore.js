import React from 'react'

// Component Imports
import ExploreHeader from '../components/explore-components/ExploreHeader'
import ProductCardsV2 from '../components/explore-components/ProductCardsV2'


// CSS Imports
import './explore.css'
// import '../components/explore-components/advanced.css'

// Image Icon Imports
import defaultProfilePicture from '../images/pfp.png'

function Explore(props) {
  return (
    <div>
      <ProductCardsV2 userID={props.userID} isLoggedIn={props.loginState} />
    </div>
  )
}

// default props for userID and loginState
Explore.defaultProps = {
  userID: "",
  loginState: false
}

export default Explore