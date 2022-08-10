import React, { useState } from 'react'

// Component Imports
import BoilerplateHeader from '../components/BoilerplateHeader'
import ExploreHeader from '../components/explore-components/ExploreHeader'
import Footer from '../components/Footer'
import SearchBar from '../components/explore-components/SearchBar'
import Title from '../components/boilerplate-components/Title'
import TinderCard from 'react-tinder-card'
import ProductCards from '../components/explore-components/ProductCards'
import Advanced from '../components/explore-components/Advanced'
import ProductButtons from '../components/explore-components/ProductButtons'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// CSS Imports
import './boilerplate-page.css'
import './explore.css'
import '../components/explore-components/advanced.css'

// Image Icon Imports
import defaultProfilePicture from '../images/pfp.png'

function Explore(props) {
  return (
    <div className="cards">
      <Advanced userID={props.userID} isLoggedIn={props.loginState} />
    </div>
  )
}

export default Explore