import React from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import defaultProfilePicture from '../images/pfp.png'

import './boilerplate-page.css'

function Home(props) {
  return (
    <div className="boilerplate">
        <BoilerplateHeader title={props.title} userPicture={props.pfp}/>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            Put your content here.
        </div>
        {/* <Footer/> */}
    </div>
  )
}

Home.defaultProps = {
  title: "Brown Marketplace",
  pfp: defaultProfilePicture
}

export default Home