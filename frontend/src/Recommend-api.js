import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Load the data from backend
function RecommendApi() {

    const [explore, setExplore] = useState("")

    const postConfig = {headers: {}}

    useEffect(() => {
        let toSend = {user: "u1"}
        const recommendUrl = "http://127.0.0.1:4567/recommend"
        axios.post(recommendUrl, toSend, postConfig)
            .then((response) => {
                console.log("recommendation loaded successfully");
                setExplore(response.data['result']);
                console.log(response.data)
            })
            .catch(e => console.log("Erroring"))
        }, []);

    // Send the user id to backend
    
    
    return (
        <div>
            {console.log("here")}
            {React.createElement('p', {}, explore)}
        </div>
    );
}

export default RecommendApi;