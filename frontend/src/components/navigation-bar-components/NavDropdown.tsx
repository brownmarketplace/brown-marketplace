import * as React from "react";
// import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';

// components
import CategoryDropdown from "./CategoryDropdown";

// database
import { readCategories } from "../../backend/Database/ProductDB/readDatabaseV2";
import { Category } from "../../models/types";
import { Button } from "@mui/material";

export default function NavDropdown(props) {
    const [categories, setCategories] = React.useState<Category[]>([]);

    React.useEffect(() => {
        readCategories(setCategories);
    }, [])

    return (
        <Box>
            <Grid container direction="row" alignItems="center">
                {categories.map((category, idx) => <Grid item xs={4} sm="auto" md="auto" key={idx} ><CategoryDropdown category={category} /></Grid>)}
                <Grid item xs={4} sm="auto" md="auto">
                    <Box sx={{ flexGrow: 1 }}>
                        <Button
                            href={`/result`}
                            disableRipple
                            color="inherit"
                            sx={{ borderRadius: "1000px" }}>
                            <Typography textTransform="capitalize">{"All Products"}</Typography>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box >
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