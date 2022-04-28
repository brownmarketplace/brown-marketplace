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
        <Link to="/">
          <img src={xButton} alt="back" className="xButton" />
        </Link>
        <Title title={props.title}/>
        {props.showProfile &&
        <ProfilePageButton userPicture={pfp}/>
        }
    </div>
  )
}

BoilerplateHeader.defaultProps = {
  showProfile: true
}

export default BoilerplateHeader