import React from 'react'
import LeavePageButton from './boilerplate-components/LeavePageButton'
import Title from './boilerplate-components/Title'
import ProfilePageButton from './boilerplate-components/ProfilePageButton'
import './boilerplate-header.css'

function BoilerplateHeader(props) {
  return (
    <div className="boilerplate-header">
        <LeavePageButton/>
        <Title title={props.title}/>
        {props.showProfile &&
        <ProfilePageButton userPicture={props.userPicture}/>
        }
    </div>
  )
}

BoilerplateHeader.defaultProps = {
  showProfile: true,
}

export default BoilerplateHeader