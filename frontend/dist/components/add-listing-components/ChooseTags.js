import { React } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
var tags = [
    "New", "Lightly Used", "Used",
    "Spring", "Summer", "Fall", "Winter",
    "Mens", "Womens", "Unisex",
    "Casual Wear", "Formal Wear", "Plus Size", "Street Wear", "Sports Wear",
    "Fitness and Sports Equipment",
    "Handmade", "Gift", "Vintage",
    "Brown Merchandise", "Holiday", "Daily Essentials", "School Essentials", "Beauty products",
    "Eco-friendly", "Cruelty-free", "Vegan", "BIPOC-made",
    "Cute", "Cultural", "Artsy", "Custom"
];
function getStyles(tag, tagName, theme) {
    return {
        fontWeight: tagName.indexOf(tag) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}
function ChooseTags(_a) {
    var handleInputChange = _a.handleInputChange, productTags = _a.productTags;
    var theme = useTheme();
    return (React.createElement("div", null,
        React.createElement(Chip, { className: "details-chip", label: "Item Tags", color: "primary", sx: { borderRadius: "4px !important", marginTop: "24px" } }),
        React.createElement("div", { style: { marginTop: "10px" } },
            React.createElement(FormControl, { sx: { width: 400 } },
                React.createElement(InputLabel, { id: "demo-multiple-chip-label" }, "Tags"),
                React.createElement(Select, { labelId: "demo-multiple-chip-label", id: "demo-multiple-chip", multiple: true, name: "productTags", value: productTags, onChange: handleInputChange, input: React.createElement(OutlinedInput, { id: "select-multiple-chip", label: "Tags" }), renderValue: function (selected) { return (React.createElement(Box, { sx: { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }, selected.map(function (value) { return (React.createElement(Chip, { key: value, label: value })); }))); }, MenuProps: MenuProps }, tags.map(function (tag) { return (React.createElement(MenuItem, { key: tag, value: tag, style: getStyles(tag, productTags, theme) }, tag)); }))))));
}
export default ChooseTags;
//# sourceMappingURL=ChooseTags.js.map