import React from "react";
import { Box, InputBase, Paper, Divider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function NavSearchBar() {
    return (
        <Box>
            <Paper elevation={0} sx={{ display: "flex", alignItems: "center" }}>
                <SearchIcon sx={{ margin: "5px" }} />
                {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                <InputBase placeholder="search..." />
            </Paper>
        </Box>
    );
}