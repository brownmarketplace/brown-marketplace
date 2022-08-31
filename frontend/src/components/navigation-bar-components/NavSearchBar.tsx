import * as React from "react";
import { Box, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function NavSearchBar() {
    return (
        <Box>
            <Paper elevation={0} sx={{ display: "flex", alignItems: "center" }}>
                <SearchIcon sx={{ margin: "5px" }} />
                <InputBase placeholder="search..." />
            </Paper>
        </Box>
    );
}