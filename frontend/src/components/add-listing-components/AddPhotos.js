import React from 'react'
import Button from "@mui/material/Button";
import './add-details.css'

function AddPhotos({handleInputChange, productImgUrls}) {

    return (
        <div className="add-details">
            <div>
                Add Photos 📸
            </div>
            <div style={{ marginTop: "10px" }}>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ borderRadius: '28px' }}
                >
                    Upload
                    <input type="file" accept="image/*" multiple onChange={handleInputChange} hidden />
                </Button>
            </div>
        </div>
    )
}

export default AddPhotos