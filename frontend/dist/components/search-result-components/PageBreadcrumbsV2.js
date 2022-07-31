import * as React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
export default function PageBreadcrumbsV2(props) {
    return (React.createElement(Breadcrumbs, { "aria-label": "breadcrumb", separator: ">" }, props.path.map(function (ele, idx) {
        return ele.href === null
            ? React.createElement(Typography, { key: idx, color: "text.primary", sx: { textTransform: 'capitalize' } }, ele.title)
            : React.createElement(Link, { key: idx, underline: "hover", color: "inherit", sx: { textTransform: 'capitalize' }, href: ele.href }, ele.title);
    })));
}
PageBreadcrumbsV2.defaultProps = {
    path: [{ title: "Home", href: "/home" },
        { title: "Category", href: "/category/Animal" },
        { title: "Subcategory", href: "/category/Animal" },
        { title: "Current Page", href: null }],
};
//# sourceMappingURL=PageBreadcrumbsV2.js.map