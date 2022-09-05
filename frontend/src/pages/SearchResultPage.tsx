import * as React from 'react';
import { useParams, useSearchParams } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material';

// components
import PageBreadcrumbsV2 from '../components/search-result-components/PageBreadcrumbsV2';
import CoverImage from '../components/search-result-components/CoverImage';
import StorefrontV2 from '../components/search-result-components/StorefrontsV2';

// database
import { readCoverImage, readAllProductsInfo, readProductsInfoByCategory, readProductsInfoBySubcategory } from '../backend/Database/ProductDB/readDatabaseV2';

// types
import { ProductInfo, Path } from '../models/types';

type SearchResultPageProps = {
    title: string,
};

export default function SearchResultPage(props: SearchResultPageProps) {
    // get url parameters
    const { category, subcategory } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedTags = searchParams.getAll("tag");

    // set breadcrumb path
    const path: Path = category
        ? (subcategory
            ? [{ title: "All Products", href: "/result" },
            { title: category, href: `/result/${category}` },
            { title: subcategory, href: null }]
            : [{ title: "All Products", href: "/result" },
            { title: category, href: null }])
        : [{ title: "All Products", href: null }];
    const title: string = path[path.length - 1].title;

    const [coverImage, setCoverImage] = React.useState<string>("loading");
    const [products, setProducts] = React.useState<ProductInfo[]>([]);

    React.useEffect(() => {
        async function fetchProducts() {
            let productsFromDB: ProductInfo[] = [];
            let coverImageFromDB: string = "";
            if (typeof subcategory !== 'undefined') {
                coverImageFromDB = await readCoverImage(subcategory);
                productsFromDB = await readProductsInfoBySubcategory(subcategory);
            } else if (typeof category !== 'undefined') {
                coverImageFromDB = await readCoverImage(category);
                productsFromDB = await readProductsInfoByCategory(category);
            } else {
                coverImageFromDB = await readCoverImage("All Products");
                productsFromDB = await readAllProductsInfo();
            }
            setCoverImage(coverImageFromDB);
            setProducts(productsFromDB);
        }

        fetchProducts();
    }, [])

    return (
        <Box sx={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
            <Stack spacing={1}>
                <PageBreadcrumbsV2 path={path} />
                <CoverImage image={coverImage}/>
                <Typography variant="h2" textTransform="capitalize">{title}</Typography>
                <StorefrontV2 selectedTags={selectedTags} products={products} />
            </Stack>
        </Box>
    );
};

SearchResultPage.defaultProps = {
    title: "Furniture",
};