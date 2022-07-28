import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import DropdownMenu from "./DropdownMenu";

export default function SortingDropdown(props) {
    const [sortingKey, setSortingKey] = React.useState(props.sortingKeys[0]);
    const [orderBy, setOrderBy] = React.useState(props.orderByOptions[0]);

    return (
        <Box>
            <Typography variant="h5">Order by</Typography>
            <Stack>
                <DropdownMenu options={props.sortingKeys} optionSetter={setSortingKey} />
                <DropdownMenu options={props.orderByOptions} optionSetter={setOrderBy} />
            </Stack>
            {/* <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }} >
                <DropdownMenu options={props.sortingKeys} optionSetter={setSortingKey} />
                <DropdownMenu options={props.orderByOptions} optionSetter={setOrderBy} />
            </Box> */}
        </Box>
    );
}

SortingDropdown.defaultProps = {
    sortingKeys: ['price', 'option 2', 'option 3'],
    orderByOptions: ['ascending', 'descending'],
}