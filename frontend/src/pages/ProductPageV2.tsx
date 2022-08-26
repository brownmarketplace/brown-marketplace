import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, Grid, Button } from '@mui/material';

// components
import PageBreadcrumbsV2 from '../components/search-result-components/PageBreadcrumbsV2';
import TagV2 from '../components/search-result-components/TagV2';
import SellerCardV2 from '../components/product-v2-components/SellerCardV2';
import ProductSlideshow from '../components/product-v2-components/ProductSlideshow';
import AddToFavoriteButton from '../components/product-v2-components/AddToFavoriteButton';
import ShareButton from '../components/product-v2-components/ShareButton';

// types
import { ProductInfo } from '../models/types';

// database
import { readOneProductInfo } from '../backend/Database/ProductDB/readDatabaseV2';

type ProductPageV2Props = {
    productInfo: ProductInfo,
};

function BuyNow() {
    return (
        <Button variant="outlined" disableRipple sx={{
            borderRadius: "1000px", textTransform: "none",
            color: "inherit",
            borderColor: "inherit",
            flexGrow: 1,
        }}>Buy now</Button>
    );
}

function Message() {
    return (
        <Button variant="outlined" disableRipple sx={{
            borderRadius: "1000px", textTransform: "none",
            color: "inherit",
            borderColor: "inherit",
            flexGrow: 1,
        }}>Message</Button>
    );
}

export default function ProductPageV2(props: ProductPageV2Props) {
    // get url parameters
    const { productId } = useParams();
    const navigate = useNavigate();

    const [productInfo, setProductInfo] = React.useState<ProductInfo>(props.productInfo); // TODO: remove mock data
    const [path, setPath] = React.useState<{ title: string, href: string }[]>([] as { title: string, href: string }[]); // TODO: remove mock data

    React.useEffect(() => {
        readOneProductInfo(productId ?? "", setProductInfo); // TODO: handle undefined
    }, []);

    React.useEffect(() => {
        setPath([{ title: "Home", href: "/home" },
        { title: productInfo.category, href: "/" + productInfo.category },
        { title: productInfo.subcategory, href: "/" + productInfo.category + "/" + productInfo.subcategory },
        { title: productInfo.name, href: null }] as { title: string, href: string }[]);
    }, [productInfo]);

    return (
        <Box sx={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
            <Stack spacing={1} >
                <PageBreadcrumbsV2 path={path} />
                <Grid container
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    justifyContent="space-between">
                    {/* Left */}
                    <Grid item xs={6}>
                        <Stack spacing={2} >
                            <ProductSlideshow images={productInfo.images} />
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1}
                                justifyContent="space-between"
                                alignItems="center">
                                <SellerCardV2 userID={productInfo.seller} postDate={productInfo.postDate} />
                                <Stack direction="row" justifyContent="space-between" spacing={1}>
                                    <AddToFavoriteButton /><ShareButton />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>

                    {/* Right */}
                    <Grid item xs={6}><Stack spacing={1}
                        sx={{
                            paddingLeft: { xs: 0, md: "25px" },
                            paddingRight: { xs: 0, md: "25px" },
                            paddingTop: { xs: "25px", md: 0 },
                            paddingBottom: { xs: "25px", md: 0 },
                        }}>
                        <Typography variant="h4">{productInfo.name}</Typography>
                        <Typography variant="h5" color="primary">${productInfo.price.toFixed(2)}</Typography>
                        <Stack direction="row" justifyContent="space-between" spacing={1}>
                            <BuyNow /><Message />
                        </Stack>
                        <Typography variant="h6">Tags</Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
                            {productInfo.tags?.map((tag, idx) => <TagV2 key={idx} title={tag} onClick={() => { navigate("/result?q=" + tag, { replace: false }); }} />)}
                        </Box>
                        <Typography variant="h6">Description</Typography>
                        <Typography variant="body2">{productInfo.description}</Typography>
                    </Stack></Grid>
                </Grid>
            </Stack>
        </Box >
    );
};

ProductPageV2.defaultProps = {
    productInfo: {
        id: 1,
        name: "Product Title",
        price: 69.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
        pictures: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxr5qIE2fBN0dfocC7TQ3VV49Y0-fE0lzexGpAf_1BqdkWrEOzVc9ki8_h1ids-xrglT4&usqp=CAU"],
        category: "Category",
        subcategory: "Subcategory",
        tags: ["Furniture", "Vintage", "Decoration", "Sofa"],
    },
};