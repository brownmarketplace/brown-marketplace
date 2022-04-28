import React from 'react';
import { Link } from 'react-router-dom'
import './profile-page-button.css'

function ProfilePageButton(props) {
  return (
    <Link to="/profile"> {/* need to change to actual user profile path later */}
      <img src={props.userPicture} className="profile-page-button"></img>
    </Link>
  );
}

export default ProfilePageButton;