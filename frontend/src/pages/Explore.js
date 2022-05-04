import React from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import ExploreHeader from '../components/explore-components/ExploreHeader'
import Footer from '../components/Footer'
import defaultProfilePicture from '../images/pfp.png'

import './boilerplate-page.css'

function Explore(props) {
  return (
    <div className="boilerplate">
        <ExploreHeader title={props.title} userPicture={props.pfp}/>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            Put your content here.
        </div>
        {/* <Footer/> */}
    </div>
  )
}

Explore.defaultProps = {
  title: "Brown Marketplace",
  pfp: defaultProfilePicture
}

export default Explore