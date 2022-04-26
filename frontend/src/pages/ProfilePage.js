import React from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import WishList from '../components/WishList'
import defaultProfilePicture from '../images/pfp.png'

import './boilerplate-page.css'
import './profile-page.css'

function ProfilePage(props) {
  return (
    <div className="boilerplate">
        <BoilerplateHeader title={props.title} userPicture={props.pfp} showProfile="false"/>
        <div className="profile-contents">
            <div className="first-profile-section">
                <div className="profile-picture">
                    (profile picture)
                    props.pfp
                </div>
                <div>
                    <div className="username">
                        (username)
                        props.user.username
                    </div>
                    <div className="user-info">
                        (user info)
                        user.user.userID
                        email
                        phoneNumber
                        location
                    </div>
                    <div className="user-listing-and-referrals">
                        <div className="user-listing">
                            {/* <Listing/> */}
                            (listing)
                            props.user.listing
                        </div>
                        <div className="user-referred-list">
                            {/* <Referred/> */}
                            (ppl u have referred)'
                        </div>
                    </div>
                </div>
            </div>
            <div className="second-profile-section">
                <WishList/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

ProfilePage.defaultProps = {
  title: "Profile",
  pfp: defaultProfilePicture
}

export default ProfilePage