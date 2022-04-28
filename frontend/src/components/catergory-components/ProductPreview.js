import React from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

import './product-preview.css'
import productPlaceholder from '../../images/product-placeholder.png'

function ProductPreview(props) {
    const productId = props.productId
    // product info
    const image = productPlaceholder
    const title = "product " + props.productId
    const price = "$4.99"
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus odio venenatis convallis congue. Fusce condimentum imperdiet justo. Aenean ut ligula in arcu facilisis convallis non fermentum purus. Duis elementum volutpat velit eu venenatis. Nam vitae iaculis odio. Nam viverra ante et iaculis semper. Ut congue magna eu sem commodo dignissim."
    const shortDescription = description.substring(0, 50) + "..."

    return (
        <CardActionArea href={"../product/" + props.productId}>
            <Card sx={{ width: 200, height: 280 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={image}
                />
                <CardContent sx={{paddingTop: 0.5, paddingLeft: 1, paddingRight:1}}>
                    <div className="content-header">
                        <Typography variant="h6" component="div" align="left">
                            {title}
                        </Typography>
                        <Typography variant="h6" component="div" align="right">
                            {price}
                        </Typography>
                    </div>
                    <div className="content">
                        <Typography variant="body2" color="text.secondary" align="left">
                            {/* {description} */}
                            {shortDescription}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </CardActionArea>
        // <a href={"../product/" + props.productId}>
        //     <div className="product-preview">
        //         <img className="preview-image" src={image} />
        //         <div className="preview-info">
        //             <div className="preview-header">
        //                 <div className="preview-product-title">{title}</div>
        //                 <div className="preview-product-price">{price}</div>
        //             </div>
        //             <div className="preview-product-description">{shortDescription}</div>
        //         </div>
        //     </div>
        // </a>
    );
}

ProductPreview.defaultProps = {
    productId: 1,
}

export default ProductPreview;