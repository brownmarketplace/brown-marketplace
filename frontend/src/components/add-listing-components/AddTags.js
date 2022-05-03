import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddTags() {
    const [hashtag, setHashtag] = useState("");
    const [numberOfHashtags, setNumberOfHashtags] = useState(0);
    const [arrayOfHashtags, addHashtag] = useState([]);
    
    // const handleDelete = chipToDelete => () => {
    //     addHashtag(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    //     // setNumberOfHashtags(numberOfHashtags - 1);
    // };

    const handleHashtagChange = event => setHashtag(event.target.value);

    // const handleClick = () => {
    //     console.info("You clicked the Chip.");
    // };

    const newHashtag = () => {
        if (numberOfHashtags < 6) {
            setNumberOfHashtags(numberOfHashtags + 1);
            addHashtag(arrayOfHashtags => arrayOfHashtags.concat(hashtag));
        } else {
            console.log("Too much hashtags");
            alert("Add up to 6 hashtags!")
        }
    }

    const Hashtags = arrayOfHashtags.map((h, index) => (
        <Chip
        size="medium"
        label={h}
        key={index}
        sx={{ marginRight: "5px", marginTop: "5px" }}
        // onDelete={handleDelete(h)}
        />
    ))

    console.log(arrayOfHashtags)

    return (
        <div>
            <Chip 
            className="details-chip"
            label="Item Tags" 
            color="primary" 
            sx={{ borderRadius: "4px !important", marginTop: "24px" }} 
            />
            <div style={{ marginTop: "10px" }}>
                <TextField
                    size="small"
                    inputProps={{
                        style: { fontSize: 15 }
                    }}
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    placeholder="Add up to 6 tags"
                    variant="outlined"
                    value={hashtag}
                    onChange={handleHashtagChange}
                />
                <Button color="primary" onClick={newHashtag} variant="outlined" sx={{ marginLeft: "10px" }}>
                    Add
                </Button>
            </div>
            <div>
                {numberOfHashtags > 0 ? Hashtags : ""}
            </div>
        </div>
    );
}

export default AddTags