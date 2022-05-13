import React, { useState, useEffect } from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import WishList from '../components/profile-components/WishList'
import UserListings from '../components/profile-components/UserListings'
import defaultProfilePicture from '../images/pfp.png'
import database from "../backend/Database/DBInstance"
import { ref, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";


import './boilerplate-page.css'
import './profile-page.css'

function ProfilePage(props) {
    const [img, setImg] = useState();

    useEffect(() => {
        const readOneUserInfo = async () => {
            onValue(ref(database, 'users/' + props.userID), (snapshot) => {
            const userInfo = snapshot.val()
            
            if (userInfo) {
                if (userInfo.profilePic) {
                    console.log('userInfo.profilePic')
                    console.log(userInfo.profilePic)
                    setImg(userInfo.profilePic)
                }
            }})
        }

        readOneUserInfo().catch(console.error);  
    }, [props])

    return (
        <div className="boilerplate">
            <BoilerplateHeader title="Brown Marketplace" userPicture={props.pfp} showProfile={false}/>
            <div className="profile-contents">
                <div className="first-profile-section">
                    <div>
                        {
                            img ? (
                                <div>
                                    <img 
                                        src={img}
                                        className="profile-picture-source"
                                    />
                                </div>                                
                            ) : (
                                <div>Loading...</div>
                            )
                        }
                    </div>
                    <div>
                        <div className="username">
                            {props.name}
                        </div>
                        <div>
                            <p className="user-info">
                                {props.email}
                            </p>
                        </div>
                        <div className="user-listings">
                            <UserListings userId={props.userID} />
                        </div>
                    </div>
                </div>
                <div className="second-profile-section">
                    <WishList userID={props.userID}/>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

ProfilePage.defaultProps = {
  title: "Profile",
  pfp: defaultProfilePicture,
  name: "New User",
  email: "new_user.brown.edu"  
}

export default ProfilePage