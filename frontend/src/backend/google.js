import {GoogleLogin, GoogleLogout, useGoogleLogin} from 'react-google-login';

import { useState } from 'react';

// Load the data from backend
function GoogleAuth() {

    // const { signIn, loaded } = useGoogleLogin({
    //     onSuccess,
    //     onAutoLoadFinished,
    //     clientId,
    //     cookiePolicy,
    //     loginHint,
    //     hostedDomain,
    //     autoLoad,
    //     isSignedIn,
    //     fetchBasicProfile,
    //     redirectUri,
    //     discoveryDocs,
    //     onFailure,
    //     uxMode,
    //     scope,
    //     accessType,
    //     responseType,
    //     jsSrc,
    //     onRequest,
    //     prompt
    //   })

    //   const { signOut, loaded } = useGoogleLogout({
    //     jsSrc,
    //     onFailure,
    //     clientId,
    //     cookiePolicy,
    //     loginHint,
    //     hostedDomain,
    //     fetchBasicProfile,
    //     discoveryDocs,
    //     uxMode,
    //     redirectUri,
    //     scope,
    //     accessType,
    //     onLogoutSuccess
    //   })

      const responseGoogle = (response) => {
        console.log(response);
      }
    
      return (
        <div>
            <GoogleLogin
                clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />

            <GoogleLogout
                clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={()=>console.log("success")}
                onFailure={responseGoogle}
            />
        </div>
      );
}

export default GoogleAuth;