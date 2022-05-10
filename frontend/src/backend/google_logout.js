import {GoogleLogin, GoogleLogout, useGoogleLogin} from 'react-google-login';

import { useState } from 'react';

// Load the data from backend
function GoogleLogoutButton() {
      const responseGoogle = (response) => {
        console.log(response);
      }
    
      return (
        <div>
            <GoogleLogout
                clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={()=>console.log("success")}
                onFailure={responseGoogle}
            />
        </div>
      );
}

export default GoogleLogoutButton;