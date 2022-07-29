import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import PageBreadcrumbsV2 from '../components/search-result-components/PageBreadcrumbsV2';
import CoverImage from '../components/search-result-components/CoverImage';
import StorefrontV2 from '../components/search-result-components/StorefrontsV2';

type SearchResultPageProps = {
    title: string,
};

export default function SearchResultPage(props: SearchResultPageProps) {
    return (
        <Box sx={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
            {/* <Box> */}
            <Stack spacing={1}>
                <PageBreadcrumbsV2 />
                <CoverImage />
                <Typography variant="h1">{props.title}</Typography>
                <StorefrontV2 />
            </Stack>
        </Box>
    );
};

SearchResultPage.defaultProps = {
    title: "Furniture",
};