import React from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import ExploreHeader from '../components/explore-components/ExploreHeader'
import Footer from '../components/Footer'
import SearchBar from '../components/explore-components/SearchBar'
import defaultProfilePicture from '../images/pfp.png'

// CSS Imports
import './boilerplate-page.css'
import './explore.css'

function Explore(props) {
  return (
    <div className="boilerplate">
        <ExploreHeader title={props.title} userPicture={props.pfp}/>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          Slider
        </div>
    </div>
  )
}

Explore.defaultProps = {
  title: "Brown Marketplace",
  pfp: defaultProfilePicture
}

export default Explore