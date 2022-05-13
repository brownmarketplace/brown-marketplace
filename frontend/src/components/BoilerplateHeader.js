import React from 'react'
import { Link } from 'react-router-dom'
import Title from './boilerplate-components/Title'
import ProfilePageButton from './boilerplate-components/ProfilePageButton'
import xButton from "../images/back-button.png"
import pfp from "../images/profile-pic.png"
import './boilerplate-header.css'

function BoilerplateHeader(props) {
  return (
    <div className="boilerplate-header">
        {/* On click, returns to the previous page. */}
        <Link to={-1}>
          <img src={xButton} alt="back" className="xButton" />
        </Link>
        <Link to="/explore" className="title-link">
          <Title title="Brown Marketplace"/>
        </Link>

        {/* If showProfile is true, render ProfilePageButton.
        Else, render empty div to keep the header layout consistent (flex: space-around). */}

        { props.showProfile && <ProfilePageButton userID={props.userID} userPicture={pfp}/> }
        { !props.showProfile && <div/> } 
    </div>
  )
}

BoilerplateHeader.defaultProps = {
  showProfile: true
}

export default BoilerplateHeader