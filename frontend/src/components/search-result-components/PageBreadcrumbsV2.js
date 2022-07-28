import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

export default function PageBreadcrumbsV2(props) {
    return (
        <Breadcrumbs aria-label="breadcrumb" separator={">"}>
            {props.path.map((ele, idx) =>
                ele.href === null
                    ? <Typography
                        key={idx}
                        color="text.primary"
                        sx={{ textTransform: 'capitalize' }}>
                        {ele.title}
                    </Typography>
                    : <Link
                        key={idx}
                        underline="hover"
                        color="inherit"
                        sx={{ textTransform: 'capitalize' }}
                        href={ele.href}>
                        {ele.title}
                    </Link>
            )}
        </Breadcrumbs>
    );
}

PageBreadcrumbsV2.defaultProps = {
    path: [{ title: "Home", href: "/home" },
    { title: "Category", href: "/category/Animal" },
    { title: "Subcategory", href: "/category/Animal" },
    { title: "Current Page", href: null }],
}