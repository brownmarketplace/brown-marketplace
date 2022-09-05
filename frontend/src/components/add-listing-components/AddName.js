import React from 'react'
import Chip from '@mui/material/Chip';
// import TextField from '@mui/material/TextField';
import WhiteTextField from './WhiteTextField';
import FormControl from '@mui/material/FormControl';
// import { makeStyles } from '@material-ui/core/styles';
// import { styled } from "@mui/material/styles";
import './add-details.css'

function AddName({handleInputChange, productName}) {

    return (
        <div className="add-details">
            <div>
                Product Name
            </div>
            <div style={{ marginTop: "10px" }}>
                <FormControl sx={{ marginTop: "4px", width: 400 }}>
                    <WhiteTextField
                        id="outlined-multiline-static"
                        variant="outlined"
                        placeholder="Enter item name."
                        className="details-text"
                        onChange={handleInputChange}
                        value={productName}
                        name="productName"
                    />
                </FormControl>
            </div>
        </div>
    )
}

export default AddName