import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import './add-details.css';
function AddDetails(_a) {
    var handleInputChange = _a.handleInputChange, productDesc = _a.productDesc;
    return (React.createElement("div", { className: "add-details" },
        React.createElement("div", null,
            React.createElement(Chip, { label: "Item Details", className: "details-chip", color: "primary" })),
        React.createElement("div", { style: { marginTop: "10px" } },
            React.createElement(TextField, { id: "outlined-multiline-static", multiline: true, rows: 3, variant: "outlined", placeholder: "Enter item description.", className: "details-text", onChange: handleInputChange, value: productDesc, name: "productDesc" }))));
}
export default AddDetails;
//# sourceMappingURL=AddDetails.js.map