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
  <div className="cardDisplay">
    <div className="app">
      <Advanced />
  </div>


    {/* <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '83vh',
        // justifyContent: 'center',
        // alignItems: 'center', 
      }}
    >
  <Grid item xs={3}>
    <ProductCards userID={props.userID} isLoggedIn={false} />s
  </Grid>      
 </Grid> */}


    {/* <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Grid container direction="column" justifyContent="center" spacing={1} paddingLeft="10%" paddingRight="10%">
          <p>Hi!</p>
        </Grid>
    </div> */}
    {/* <ProductCards userID={props.userID} isLoggedIn={false} />s */}
  </div>
    // <div className="boilerplate">
    //     {/* <ExploreHeader userID={props.userID} loginState={props.loginState} logoutState={props.logoutState} title={props.title} userPicture={props.pfp}/> */}
    //     {/* Notify user that there are no more cards in the pile */}
    //     {/* <div style={{ textAlign: 'center', marginTop: '30px' }}>
    //        Empty
    //     </div> */}
    // </div>
  )
}

Explore.defaultProps = {
  title: "Brown Marketplace",
  pfp: defaultProfilePicture
}

export default Explore