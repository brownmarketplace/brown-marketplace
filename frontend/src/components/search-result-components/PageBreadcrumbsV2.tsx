import * as React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

type PageBreadcrumbsV2Props = {
    path: { title: string, href: string }[],
}
export default function PageBreadcrumbsV2(props: PageBreadcrumbsV2Props) {
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
    { title: "Category", href: "/result?q=category" },
    { title: "Subcategory", href: "/result?q=subcategory" },
    { title: "Current Page", href: null }],
}