import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './profile-page-button.css'
import Avatar from '@mui/material/Avatar';

// database
import { ref, onValue }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"
import database from '../../backend/Database/DBInstance'

function ProfilePageButton(props) {
  const [userPicture, setUserPicture] = useState()

  const readOneUserInfo = async () => {
    onValue(ref(database, 'users/' + props.userID), (snapshot) => {
      const userInfo = snapshot.val()
      setUserPicture(userInfo.profilePic)
    })
  }

  useEffect(() => {
    if (props.userID != 'uundefined') {
      readOneUserInfo().catch(console.error)
    }
  }, [props])

  return (
    <Link to={`/profile/${props.userID}`}>
      <Avatar src={userPicture} style={{ width: 50, height: 50 }} />
    </Link>
  );
}

ProfilePageButton.defaultProps = {
  userID: null,
}

export default ProfilePageButton;