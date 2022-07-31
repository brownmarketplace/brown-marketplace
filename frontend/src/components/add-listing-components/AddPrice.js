import React, { useState } from 'react'
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
import WhiteOutlinedInput from './WhiteOutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import './add-details.css'

function AddPrice({handleInputChange, productPrice}) {
    // const [values, setValues] = React.useState({
    //     amount: ''
    // });
    
    // const handleChange = (prop) => (event) => {
    //   setValues({ ...values, [prop]: event.target.value });
    // };

    return (
        <div>
            <div style={{ marginTop: "20px", fontSize: "1.6vw" }}>
                Price
            </div>
            <div style={{ marginTop: "10px" }}>
                <FormControl sx={{ marginTop: "4px", width: 400 }}>
                    <WhiteOutlinedInput
                        id="outlined-adornment-amount"
                        value={productPrice}
                        className="details-text"
                        // onChange={handleChange('amount')}
                        onChange={handleInputChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        name="productPrice"
                    />
                </FormControl>
            </div>
        </div>
    )
}

export default AddPrice