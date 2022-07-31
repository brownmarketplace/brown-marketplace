import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import './add-details.css';
function AddName(_a) {
    var handleInputChange = _a.handleInputChange, productName = _a.productName;
    return (React.createElement("div", { className: "add-details" },
        React.createElement("div", null,
            React.createElement(Chip, { label: "Item Name", className: "details-chip", color: "primary" })),
        React.createElement("div", { style: { marginTop: "10px" } },
            React.createElement(TextField, { id: "outlined-multiline-static", multiline: true, rows: 1, variant: "outlined", placeholder: "Enter item name.", className: "details-text", onChange: handleInputChange, value: productName, name: "productName" }))));
}
export default AddName;
//# sourceMappingURL=AddName.js.map