import React from 'react';

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import { ImageList } from '@mui/material'
import { ImageListItem } from '@mui/material'

import ProductPreview from './ProductPreview';

function Storefront(props) {
    return (
        // grid version
        // <Grid container spacing={2} columns={60}>
        //   {productIds.map((e) =>
        //     <Grid item xs={20} md={15} lg={12}>
        //       <ProductPreview productId={e} />
        //     </Grid>)}
        // </Grid>

        <Grid container spacing={2}>
            {props.productIDs.map((e, idx) =>
                <Grid item key={idx} xs={6} md={4} lg={3}>
                    <ProductPreview productId={e} />
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
    );
}

Storefront.defaultProps = {
    productIDs: [],
}

export default Storefront;