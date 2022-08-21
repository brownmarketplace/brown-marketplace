import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import React from "react";
import CategoryDropdown from "./CategoryDropdown";

export default function NavDropdown(props) {
    return (
        <Box>
            <Stack direction={{ xs: "column", sm: "row" }}>
                {props.pages.map((page, idx) => (
                    <CategoryDropdown key={idx} title={page} items={props.subcategories[page]} />
                ))}
            </Stack>
        </Box>
    );
}

NavDropdown.defaultProps = {
    pages: ['Decoration', 'Clothes', 'Accessories', 'Books', 'Plants'],
    subcategories: {
        'Decoration': [{ title: "Decoration 1", href: "/page_1" }],
        'Clothes': [{ title: "Clothes 1", href: "/page_1" }],
        'Accessories': [{ title: "Accessories 1", href: "/page_1" }],
        'Books': [{ title: "Books 1", href: "/page_1" }],
        'Plants': [{ title: "Plants 1", href: "/page_1" }],
    }
}