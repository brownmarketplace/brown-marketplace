import React, { useState } from 'react'

// Component Imports
import BoilerplateHeader from '../components/BoilerplateHeader'
import ExploreHeader from '../components/explore-components/ExploreHeader'
import Footer from '../components/Footer'
import SearchBar from '../components/explore-components/SearchBar'
import Title from '../components/boilerplate-components/Title'
import TinderCard from 'react-tinder-card'
import ProductCards from '../components/explore-components/ProductCards'
import ProductButtons from '../components/explore-components/ProductButtons'

// CSS Imports
import './boilerplate-page.css'
import './explore.css'

// Image Icon Imports
import defaultProfilePicture from '../images/pfp.png'

function Explore(props) {
  return (
    <div className="boilerplate">
        <ExploreHeader userID={props.userID} loginState={props.loginState} logoutState={props.logoutState} title={props.title} userPicture={props.pfp}/>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
           Empty
        </div>
    </div>
  )
}

Explore.defaultProps = {
  title: "Brown Marketplace",
  pfp: defaultProfilePicture
}

export default Explore