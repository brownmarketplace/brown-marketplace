import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
// components
import DropdownMenu from "./DropdownMenu";
export default function SortingDropdown(props) {
    var _a = React.useState(props.sortingKeys[0]), sortingKey = _a[0], setSortingKey = _a[1];
    var _b = React.useState(props.orderByOptions[0]), orderBy = _b[0], setOrderBy = _b[1];
    return (React.createElement(Box, null,
        React.createElement(Typography, { variant: "h5" }, "Order by"),
        React.createElement(Stack, null,
            React.createElement(DropdownMenu, { options: props.sortingKeys, optionSetter: setSortingKey }),
            React.createElement(DropdownMenu, { options: props.orderByOptions, optionSetter: setOrderBy }))));
}
SortingDropdown.defaultProps = {
    sortingKeys: ['price', 'option 2', 'option 3'],
    orderByOptions: ['ascending', 'descending'],
};
//# sourceMappingURL=SortingDropdown.js.map