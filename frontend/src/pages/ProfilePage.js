import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
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
                    setImg(userInfo.profilePic)
                }
            }})
        }

        readOneUserInfo().catch(console.error);  
    }, [props])
      

    return (
        <div>
            <div className="profile">
                <Grid container spacing={2}>
                    <Grid item xs={9.5}>
                        <div className='username'>
                            {props.name}
                        </div>
                        <div className='email'> 
                            {props.email}
                        </div>
                    </Grid>
                    <Grid item xs={2.5}>
                        <div style={{alignContent: 'right'}}>
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
                    </Grid>
                </Grid>

                <UserListings userId={props.userID} />
                <WishList userID={props.userID}/>
            </div>
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