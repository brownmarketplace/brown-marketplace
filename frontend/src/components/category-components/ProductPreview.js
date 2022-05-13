import React from 'react'

// mui
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

function ProductPreview(props) {
  return (
    <Card style={{
      border: "none",
      boxShadow: "none",
    }}>
      <CardActionArea disableRipple href={"/product/" + props.productInfo.id}>
        <CardMedia
          component="img"
          image={props.productInfo.pictures}
          style={{ aspectRatio: 16 / 12 }}
        />
        <CardContent
          sx={{ padding: 1 }}
          style={{ aspectRatio: 16 / 3 }}
        >
          <Grid container>
            <Grid item xs={8} align="left">
              <Typography variant="subtitle1">{props.productInfo.title}</Typography>
            </Grid>
            <Grid item xs={4} align="right">
              <Typography variant="subtitle1">{props.productInfo.price}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary" align="left"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                }} >
                {props.productInfo.description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

ProductPreview.defaultProps = {
  productId: 1,
  product: {
    id: 1,
    title: "Penguin",
    price: "$4.99",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus",
    pictures: "https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg",
  }
}

export default ProductPreview
