import * as React from "react";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// components
import CategoryDropdown from "./CategoryDropdown";

// database
import { readCategories } from "../../backend/Database/ProductDB/readDatabaseV2";
import { Category } from "../../models/types";

export default function NavDropdown(props) {
    const [categories, setCategories] = React.useState<Category[]>([]);

    React.useEffect(() => {
        readCategories(setCategories);
    }, [])

    return (
        <Box>
            <Grid container direction={{ xs: "column", sm: "row", md: "row" }} alignItems="center">
                {categories.map((category, idx) => <Grid item key={idx} ><CategoryDropdown category={category} /></Grid>)}
            </Grid>
        </Box>
    );
}

// NavDropdown.defaultProps = {
//     pages: ['Decoration', 'Clothes', 'Accessories', 'Books', 'Plants'],
//     subcategories: {
//         'Decoration': [{ title: "Decoration 1", href: "/page_1" }],
//         'Clothes': [{ title: "Clothes 1", href: "/page_1" }],
//         'Accessories': [{ title: "Accessories 1", href: "/page_1" }],
//         'Books': [{ title: "Books 1", href: "/page_1" }],
//         'Plants': [{ title: "Plants 1", href: "/page_1" }],
//     }
// }