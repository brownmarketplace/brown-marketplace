import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, Divider, Button } from '@mui/material';

// components
import PageBreadcrumbsV2 from '../components/search-result-components/PageBreadcrumbsV2';
import TagV2 from '../components/search-result-components/TagV2';
import SellerCardV2 from '../components/product-v2-components/SellerCardV2';
import ProductSlideshow from '../components/product-v2-components/ProductSlideshow';
import AddToLikedListButton from '../components/product-v2-components/AddToLikedListButton';
import ShareButton from '../components/product-v2-components/ShareButton';

// types
import { ProductInfo, Path } from '../models/types';

// database
import { readOneProductInfo } from '../backend/Database/ProductDB/readDatabaseV2';
import { LegendToggle } from '@mui/icons-material';

type ProductPageV2Props = {
    mockProductInfo: ProductInfo,
    userID: string,
};

function BuyNow(props) {
    return (
        <Button sx={{
            background: "-webkit-linear-gradient(45deg, #9DCEFF, #92A3FD)",
            borderRadius: "1000px",
            textTransform: "none",
            color: "inherit",
            borderColor: "inherit",
            paddingLeft: 10,
            paddingRight: 10,
            // flexGrow: 1,
        }}><Typography sx={{
            color: "#000000",
            fontWeight: 600,
        }}>Buy now</Typography></Button>
    );
}

export default function ProductPageV2(props: ProductPageV2Props) {
    // get url parameters
    const { productId } = useParams();
    const navigate = useNavigate();

    const [productInfo, setProductInfo] = React.useState<ProductInfo>({} as ProductInfo);
    const [path, setPath] = React.useState<Path>([{ title: "All Products", href: "/result" }]);

    React.useEffect(() => {
        async function fetchProductInfo() {
            const response = await readOneProductInfo(productId ?? "");
            const product = typeof response.name !== 'undefined' ? response : props.mockProductInfo;
            setProductInfo(product);
            setPath([{ title: "All Products", href: "/result" },
            { title: product.category, href: `/result/${product.category}` },
            { title: product.subcategory, href: `/result/${product.category}/${product.subcategory}` },
            { title: product.name, href: null }]);
        }

        fetchProductInfo();
    }, []);

    return (
        <Box sx={{ display: productInfo === null ? "none" : "", paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
            <Stack spacing={1} >
                <PageBreadcrumbsV2 path={path} />
                <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    divider={<Divider orientation="vertical" flexItem />}
                    justifyContent="space-between"
                    spacing={1}>
                    {/* Left */}
                    <Box sx={{ width: "100%" }}>
                        <Stack spacing={2}>
                            <ProductSlideshow images={productInfo?.images} />
                            <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="space-between"
                                alignItems="center">
                                <SellerCardV2 userID={productInfo?.seller} postDate={productInfo?.postDate} />
                                <AddToLikedListButton productId={productInfo?.id} userID={props.userID} />
                                <ShareButton />
                            </Stack>
                        </Stack>
                    </Box>
                    {/* Right */}
                    <Box sx={{ width: "100%" }}>
                        <Stack spacing={1}>
                            <Typography variant="h4" fontWeight="fontWeightBold">{productInfo?.name}</Typography>
                            <Typography variant="h4">${productInfo?.price?.toFixed(2)}</Typography>
                            <Stack direction="row" justifyContent="space-between" spacing={1}>
                                {/* <BuyNow seller={productInfo?.seller} /> */}
                                {/* <Message /> */}
                            </Stack>
                            <Typography variant="h6" fontWeight="fontWeightBold">Description</Typography>
                            <Typography variant="body2">{productInfo?.description}</Typography>
                            <Typography variant="h6" fontWeight="fontWeightBold">Tags</Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
                                {productInfo?.tags?.map((tag, idx) => <TagV2 key={idx} title={tag} onClick={() => { navigate(`/result?tag=${tag}`, { replace: false }); }} />)}
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Box >
    );
};

ProductPageV2.defaultProps = {
    mockProductInfo: {
        id: "p0",
        name: "Product Title",
        price: 69.99,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxr5qIE2fBN0dfocC7TQ3VV49Y0-fE0lzexGpAf_1BqdkWrEOzVc9ki8_h1ids-xrglT4&usqp=CAU"],
        tags: ["Furniture", "Vintage", "Decoration", "Sofa"],
        category: "Category",
        subcategory: "Subcategory",
        seller: "u0",
        postDate: "July 2, 2022",
    },
};