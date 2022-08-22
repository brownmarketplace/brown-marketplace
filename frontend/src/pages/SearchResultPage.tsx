import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';

// components
import PageBreadcrumbsV2 from '../components/search-result-components/PageBreadcrumbsV2';
import CoverImage from '../components/search-result-components/CoverImage';
import StorefrontV2 from '../components/search-result-components/StorefrontsV2';

// database
import { readAllProductsInfo } from '../backend/Database/ProductDB/readDatabaseV2';

// types
import { ProductInfo } from '../models/types';

type SearchResultPageProps = {
    title: string,
};

export default function SearchResultPage(props: SearchResultPageProps) {
    const [products, setProducts] = React.useState<ProductInfo[]>([]);

    React.useEffect(() => {
        readAllProductsInfo(setProducts);
    }, [])

    React.useEffect(() => {
        // console.log(products);
    }, [products])

    return (
        <Box sx={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
            <Stack spacing={1}>
                <PageBreadcrumbsV2 />
                <CoverImage />
                <Typography variant="h2">{props.title}</Typography>
                <StorefrontV2 products={products}/>
            </Stack>
        </Box>
    );
};

SearchResultPage.defaultProps = {
    title: "Furniture",
};