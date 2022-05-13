import React from 'react'

import ProductPreview from './ProductPreview'

import Grid from '@mui/material/Grid'

function Storefront(props) {
    return (
        // grid version
        // <Grid container spacing={2} columns={60}>
        //   {productIds.map((e) =>
        //     <Grid item xs={20} md={15} lg={12}>
        //       <ProductPreview productId={e} />
        //     </Grid>)}
        // </Grid>

        <Grid container spacing={4}>
            {props.products.map((item, idx) =>
                <Grid item key={idx} xs={6} md={4} lg={3}>
                    <ProductPreview productInfo={item} />
                </Grid>)}
        </Grid>

        // <Grid container justifyContent="center" spacing={2}>
        //     {productIds.map((e) =>
        //         <Grid item style={{ display: 'flex' }}>
        //             <ProductPreview productId={e} />
        //         </Grid>)}
        // </Grid>

        // image list version
        // <ImageList variant="masonry" cols={5} gap={8}>
        //     {productIds.map((item) =>
        //         <ImageListItem>
        //             <ProductPreview productId={item} />
        //         </ImageListItem>
        //     )}
        // </ImageList>

        // unordered list version
        // <ul className="product-holder">
        //     {productIds.map((e) => <li><ProductPreview productId={e} /></li>)}
        // </ul>
    )
}

Storefront.defaultProps = {
    productIDs: [],
}

export default Storefront