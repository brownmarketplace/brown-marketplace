import * as React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Stack, CardActions, Link, Skeleton } from "@mui/material";

import { motion } from "framer-motion";

// components
import TagV2 from './TagV2';

// types
import { ProductInfo } from "../../models/types";

type ProductPreviewV2Props = {
  productInfo: ProductInfo,
  selectedTags: Set<string>,
  tagOnClick: (tagName: string) => void,
}

const MAX_NUM_LINE: number = 3;

export default function ProductPreviewV2(props: ProductPreviewV2Props) {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: "10px", width: "100%" }}
      component={motion.div}
      whileHover={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        scale: 1.05,
        transition: { duration: 0.2 },
      }}>
      <Link href={"/product/" + props.productInfo.id} sx={{ textDecoration: 'none' }} color="text.primary">
        {/* <CardMedia
          component="img"
          image={props.productInfo.images?.[0]}
          alt={props.productInfo.name}
          sx={{ aspectRatio: "4 / 3" }} /> */}
        {props.productInfo.images?.length > 0
          ? <CardMedia
            component="img"
            image={props.productInfo.images?.[0]}
            alt={props.productInfo.name}
            sx={{ aspectRatio: "4 / 3" }} />
          : <CardMedia
            sx={{
              width: "100%",
              aspectRatio: "4/3",
            }}>
            <Skeleton variant="rectangular" animation={false} width="100%" height="100%" />
          </CardMedia>}
        <CardContent
          sx={{
            padding: 1,
            aspectRatio: "4 / 1.5"
          }}>
          <Stack spacing={0.5}>
            {/* Header */}
            <Stack direction={{ sm: "column", md: "row" }} spacing={0.5} justifyContent="space-between">
              <Typography variant="h6"
                sx={{
                  lineHeight: "24px",
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                }}>{props.productInfo.name}</Typography>
              <Typography variant="h6"
                sx={{
                  lineHeight: "24px"
                }}>${props.productInfo.price.toFixed(2)}</Typography>
            </Stack>

            {/* Product description */}
            <Typography variant="caption" color="text.secondary" align="left"
              sx={{
                lineHeight: "16px",
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: MAX_NUM_LINE,
                WebkitBoxOrient: 'vertical',
              }}>{props.productInfo.description}</Typography>

          </Stack>
        </CardContent>
      </Link>
      <CardActions sx={{ padding: 1, aspectRatio: "4 / 1" }}>
        {/* Product tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
          {props.productInfo.tags?.map((tag, idx) => <TagV2 key={idx} title={tag} preview={true} onClick={() => props.tagOnClick(tag)} selected={props.selectedTags.has(tag)} />)}
        </Box>
      </CardActions>
    </Card >
  )
}

ProductPreviewV2.defaultProps = {
  selectedTags: new Set(),
  tagOnClick: () => { },
}