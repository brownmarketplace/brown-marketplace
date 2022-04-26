import React from 'react';
import { Link } from 'react-router-dom'

function ProfilePageButton(props) {
  return (
    <div>
      <button type="button">Profile Picture<img src={props.userPicture}></img></button>
    </div>
  );
}

export default ProfilePageButton;