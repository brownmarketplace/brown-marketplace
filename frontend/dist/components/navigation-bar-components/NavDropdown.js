import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import React from "react";
import CategoryDropdown from "./CategoryDropdown";
export default function NavDropdown(props) {
    return (React.createElement(Box, null,
        React.createElement(Stack, { direction: { xs: "column", sm: "row" } }, props.pages.map(function (page) { return (React.createElement(CategoryDropdown, { title: page, items: props.subcategories[page] })); }))));
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
};
//# sourceMappingURL=NavDropdown.js.map