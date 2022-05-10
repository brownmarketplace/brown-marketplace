import React, {useState} from 'react';
import axios from 'axios';

// Load the data from backend
function RecommendApi() {

    const [explore, setExplore] = useState("")

    const postConfig = {headers: {}}

    // Send the user id to backend
    let toSend = {user: "1"}
    const recommendUrl = "http://127.0.0.1:4567/recommend"
    axios.post(recommendUrl, toSend, postConfig)
        .then((response) => {
            console.log("recommendation loaded successfully");
            setExplore(response.data['result']);
            console.log(response.data)
        })
        .catch(e => console.log(e))
    
    return (
        <div>
            {React.createElement('p', {}, explore)}
        </div>
    );
}

export default RecommendApi;