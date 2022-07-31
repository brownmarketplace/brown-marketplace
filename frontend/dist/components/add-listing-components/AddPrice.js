import React from 'react';
import Chip from "@mui/material/Chip";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
function AddPrice(_a) {
    // const [values, setValues] = React.useState({
    //     amount: ''
    // });
    var handleInputChange = _a.handleInputChange, productPrice = _a.productPrice;
    // const handleChange = (prop) => (event) => {
    //   setValues({ ...values, [prop]: event.target.value });
    // };
    return (React.createElement("div", null,
        React.createElement(Chip, { className: "details-chip", label: "Item Price", color: "primary", sx: { borderRadius: "4px !important", marginTop: "24px" } }),
        React.createElement("div", { style: { marginTop: "10px" } },
            React.createElement(FormControl, { sx: { marginTop: "4px", width: 400 } },
                React.createElement(InputLabel, { htmlFor: "outlined-adornment-amount" }, "Amount"),
                React.createElement(OutlinedInput, { id: "outlined-adornment-amount", value: productPrice, 
                    // onChange={handleChange('amount')}
                    onChange: handleInputChange, startAdornment: React.createElement(InputAdornment, { position: "start" }, "$"), label: "Amount", name: "productPrice" })))));
}
export default AddPrice;
//# sourceMappingURL=AddPrice.js.map