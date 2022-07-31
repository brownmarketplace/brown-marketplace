import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PageBreadcrumbsV2 from '../components/search-result-components/PageBreadcrumbsV2';
import CoverImage from '../components/search-result-components/CoverImage';
import StorefrontV2 from '../components/search-result-components/StorefrontsV2';
export default function SearchResultPage(props) {
    return (React.createElement(Box, { sx: { paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" } },
        React.createElement(Stack, { spacing: 1 },
            React.createElement(PageBreadcrumbsV2, null),
            React.createElement(CoverImage, null),
            React.createElement(Typography, { variant: "h1" }, props.title),
            React.createElement(StorefrontV2, null))));
}
;
SearchResultPage.defaultProps = {
    title: "Furniture",
};
//# sourceMappingURL=SearchResultPage.js.map