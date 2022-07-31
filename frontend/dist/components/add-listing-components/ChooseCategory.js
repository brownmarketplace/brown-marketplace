import * as React from 'react';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function ChooseCategory(_a) {
    var handleInputChange = _a.handleInputChange, productSubcategory = _a.productSubcategory;
    return (React.createElement("div", { style: { marginTop: "24px" } },
        React.createElement("div", null,
            React.createElement(Chip, { className: "details-chip", label: "Item Category", color: "primary", sx: { borderRadius: "4px !important" } })),
        React.createElement(FormControl, { sx: { minWidth: 120, marginTop: "12px", width: 400 } },
            React.createElement(InputLabel, { htmlFor: "grouped-select" }, "Category"),
            React.createElement(Select, { defaultValue: "", id: "grouped-select", label: "Grouping", onChange: handleInputChange, value: productSubcategory, name: "productSubcategory" },
                React.createElement(MenuItem, { value: "" },
                    React.createElement("em", null, "None")),
                React.createElement(ListSubheader, null, "Room Decor"),
                React.createElement(MenuItem, { value: "Plushies" }, "Plushies"),
                React.createElement(MenuItem, { value: "Plants" }, "Plants"),
                React.createElement(MenuItem, { value: "Lights" }, "Lights"),
                React.createElement(MenuItem, { value: "Posters" }, "Posters"),
                React.createElement(MenuItem, { value: "Tapestries" }, "Tapestries"),
                React.createElement(MenuItem, { value: "Other room decor" }, "Other room decor"),
                React.createElement(ListSubheader, null, "Furniture"),
                React.createElement(MenuItem, { value: "Chairs" }, "Chairs"),
                React.createElement(MenuItem, { value: "Couches" }, "Couches"),
                React.createElement(MenuItem, { value: "Mattresses" }, "Mattresses"),
                React.createElement(MenuItem, { value: "Pillows" }, "Pillows"),
                React.createElement(MenuItem, { value: "Other furniture" }, "Other furniture"),
                React.createElement(ListSubheader, null, "Clothing"),
                React.createElement(MenuItem, { value: "Tops" }, "Tops"),
                React.createElement(MenuItem, { value: "Pants" }, "Pants"),
                React.createElement(MenuItem, { value: "Dresses" }, "Dresses"),
                React.createElement(MenuItem, { value: "Shoes" }, "Shoes"),
                React.createElement(MenuItem, { value: "Coats and jackets" }, "Coats and jackets"),
                React.createElement(MenuItem, { value: "Other clothing" }, "Other clothing"),
                React.createElement(ListSubheader, null, "Accessories"),
                React.createElement(MenuItem, { value: "Necklaces" }, "Necklaces"),
                React.createElement(MenuItem, { value: "Bracelets" }, "Bracelets"),
                React.createElement(MenuItem, { value: "Earrings" }, "Earrings"),
                React.createElement(MenuItem, { value: "Hair clips" }, "Hair clips"),
                React.createElement(MenuItem, { value: "Other accessories" }, "Other accessories"),
                React.createElement(ListSubheader, null, "Books"),
                React.createElement(MenuItem, { value: "Textbooks" }, "Textbooks"),
                React.createElement(MenuItem, { value: "Fiction" }, "Fiction"),
                React.createElement(MenuItem, { value: "Nonfiction" }, "Nonfiction"),
                React.createElement(MenuItem, { value: "Poetry" }, "Poetry"),
                React.createElement(MenuItem, { value: "Other books" }, "Other books"),
                React.createElement(ListSubheader, null, "Electronics and related"),
                React.createElement(MenuItem, { value: "Speakers" }, "Speakers"),
                React.createElement(MenuItem, { value: "Phones" }, "Phones"),
                React.createElement(MenuItem, { value: "Devices" }, "Devices"),
                React.createElement(MenuItem, { value: "Other electronics and related" }, "Other electronics and related"),
                React.createElement(ListSubheader, null, "Other"),
                React.createElement(MenuItem, { value: "Miscellaneous" }, "Miscellaneous")))));
}
export default ChooseCategory;
//# sourceMappingURL=ChooseCategory.js.map