import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import './add-details.css';
function AddPhotos(_a) {
    var handleInputChange = _a.handleInputChange, productImgUrls = _a.productImgUrls;
    return (React.createElement("div", { className: "add-details" },
        React.createElement("div", null,
            React.createElement(Chip, { label: "Item Photos", className: "details-chip", color: "primary" })),
        React.createElement("div", { style: { marginTop: "10px" } },
            React.createElement(TextField, { id: "outlined-multiline-static", multiline: true, rows: 5, variant: "outlined", placeholder: "Enter comma-separated image urls. Note: please do not include urls with commas in them.", className: "details-text", onChange: handleInputChange, name: "productImgUrls", value: productImgUrls }))));
}
export default AddPhotos;
//# sourceMappingURL=AddPhotos.js.map