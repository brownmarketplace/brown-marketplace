import React from "react";
import { Box, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export default function NavSearchBar() {
    return (React.createElement(Box, null,
        React.createElement(Paper, { elevation: 3, sx: { display: "flex", alignItems: "center" } },
            React.createElement(SearchIcon, { sx: { margin: "5px" } }),
            React.createElement(InputBase, { placeholder: "search..." }))));
}
//# sourceMappingURL=NavSearchBar.js.map