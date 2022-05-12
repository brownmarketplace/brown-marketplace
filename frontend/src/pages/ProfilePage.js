import React from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import WishList from '../components/profile-components/WishList'
import UserListings from '../components/profile-components/UserListings'
import defaultProfilePicture from '../images/pfp.png'
import { useParams } from "react-router-dom";

import './boilerplate-page.css'
import './profile-page.css'

function ProfilePage(props) {
  let params = useParams();

  
  return (
    <div className="boilerplate">
        {console.log("User ID from App", props.userID)}
        <BoilerplateHeader title={props.title} userPicture={props.pfp} showProfile="false"/>
        <div className="profile-contents">
            <div className="first-profile-section">
                <div className="profile-picture">
                    {/* props.pfp */}
                </div>
                <div>
                    <div className="username">
                        Nim Telson {props.userID}
                    </div>
                    <div>
                        <p className="user-info">nim_telson@brown.edu</p>
                        {/* props.user.userID
                        email
                        phoneNumber
                        location */}
                    </div>
                    <div className="user-listing">
                        <UserListings />
                    </div>
                </div>
            </div>
            <div className="second-profile-section">
                <WishList/>
            </div>
        </div>
        {/* <Footer/> */}
    </div>
  )
}

ProfilePage.defaultProps = {
  title: "Profile",
  pfp: defaultProfilePicture
}

export default ProfilePage