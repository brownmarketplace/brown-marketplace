import React, {useState} from 'react';
import axios from 'axios';

// Load the data from backend
function ExploreApi() {

    const [explore, setExplore] = useState("")

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
    };

    // Fetch the data from backend
    const exploreUrl = "http://127.0.0.1:4567/explore"
    axios.get(exploreUrl, config)
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

export default ExploreApi;