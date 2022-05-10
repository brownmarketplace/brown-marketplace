import React, { useState } from 'react'
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

function AddPrice() {
    const [values, setValues] = React.useState({
        amount: ''
    });
    
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div>
            <Chip 
                className="details-chip"
                label="Item Price" 
                color="primary" 
                sx={{ borderRadius: "4px !important", marginTop: "24px" }} 
            />
            <div style={{ marginTop: "10px" }}>
                <FormControl sx={{ marginTop: "4px" }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                    />
                </FormControl>
            </div>
        </div>
    )
}

export default AddPrice