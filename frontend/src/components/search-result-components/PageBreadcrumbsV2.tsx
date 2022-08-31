import * as React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// types
import { ProductInfo, Path } from '../../models/types';

type PageBreadcrumbsV2Props = {
    path: Path,
}

export default function PageBreadcrumbsV2(props: PageBreadcrumbsV2Props) {
    return (
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            {props.path.map((ele, idx) =>
                ele.href === null
                    ? <Typography
                        key={idx}
                        color="text.primary"
                        textTransform="capitalize"
                        fontWeight="fontWeightBold">
                        {ele.title}
                    </Typography>
                    : <Link
                        key={idx}
                        underline="hover"
                        color="inherit"
                        textTransform="capitalize"
                        href={ele.href}>
                        {ele.title}
                    </Link>)}
        </Breadcrumbs>
    );
}

// PageBreadcrumbsV2.defaultProps = {
//     path: [{ title: "Home", href: "/home" },
//     { title: "Category", href: "/result?q=category" },
//     { title: "Subcategory", href: "/result?q=subcategory" },
//     { title: "Current Page", href: null }],
// }