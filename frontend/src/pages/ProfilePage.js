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
    // const { userId } = useParams();

    return (
        <div className="boilerplate">
            <BoilerplateHeader title={props.title} userPicture={props.pfp} showProfile="false"/>
            <div className="profile-contents">
                <div className="first-profile-section">
                    <div className="profile-picture">
                        {/* props.pfp */}
                    </div>
                    <div>
                        <div className="username">
                            {/* {props.name} */}
                            Nim Telson
                        </div>
                        <div>
                            <p className="user-info">
                                {/* {props.email} */}
                                {/* Seller Id: {userId} */}
                                Brown Verified
                            </p>
                        </div>
                        <div className="user-listings">
                            {console.log("Passing a userId into UserListings, userId is:")}
                            {console.log(props.userID)}
                            <UserListings userId={props.userID} />
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
  pfp: defaultProfilePicture,
  name: "Nim Telson",
  email: "nim_telson.brown.edu"  
}

export default ProfilePage