import React, {useState} from 'react';
import axios from 'axios';

// Load the data from backend
function RecommendApi() {

    const postConfig = {headers: {}}

    // Send the user id to backend
    let toSend = {user: "2"}
    const recommendUrl = "http://127.0.0.1:4567/recommend"
    axios.post(recommendUrl, toSend, postConfig)
        .then((response) =>
            console.log(response.data))
        .catch(error => {
            console.log(error);
        })
    
    return (
        <div>
            {React.createElement('p', {}, explore)}
        </div>
    );
}

export default RecommendApi;