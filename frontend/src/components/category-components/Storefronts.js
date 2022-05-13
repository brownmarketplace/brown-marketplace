import React from 'react'

import ProductPreview from './ProductPreview'

import Grid from '@mui/material/Grid'

function Storefront(props) {
    return (
        <Grid container spacing={2} marginTop={0} marginBottom={5}>
            {props.products.map((item, idx) =>
                <Grid item key={idx} xs={6} md={4} lg={3} display="flex">
                    <ProductPreview productInfo={item} />
                </Grid>)}
        </Grid>
    )
}

Storefront.defaultProps = {
    products: [],
}

export default Storefront