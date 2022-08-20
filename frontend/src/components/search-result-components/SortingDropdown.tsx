import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";

// components
import DropdownMenu from "./DropdownMenu";

type SortingDropdownProps = {
    sortingKeys: string[],
    orderByOptions: string[],
}

export default function SortingDropdown(props: SortingDropdownProps) {
    const [sortingKey, setSortingKey] = React.useState<string>(props.sortingKeys[0]);
    const [orderBy, setOrderBy] = React.useState<string>(props.orderByOptions[0]);

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