import * as React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Stack, CardActions, Link } from "@mui/material";

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
      sx={{ borderRadius: "10px" }}
      component={motion.div}
      whileHover={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        scale: 1.05,
        transition: { duration: 0.2 },
      }}>
      <Link href={"/productV2/" + props.productInfo.id} sx={{ textDecoration: 'none' }} color="text.primary">
        <CardMedia
          component="img"
          image={props.productInfo.images[0]}
          alt={props.productInfo.name}
          sx={{ aspectRatio: "4 / 3" }} />
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
          {props.productInfo.tags?.map((tag, idx) => <TagV2 key={idx} title={tag} onClick={() => props.tagOnClick(tag)} selected={props.selectedTags.has(tag)} />)}
        </Box>
      </CardActions>
    </Card>
  )
}

// ProductPreviewV2.defaultProps = {
//   productInfo: {
//     id: 1,
//     name: "Leather Sofa",
//     price: 69.99,
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
//     pictures: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxr5qIE2fBN0dfocC7TQ3VV49Y0-fE0lzexGpAf_1BqdkWrEOzVc9ki8_h1ids-xrglT4&usqp=CAU"],
//     tags: ["Furniture", "Vintage", "Decoration", "Sofa"],
//   },
//   selectedTags: [],
//   tagOnClick: (tagName) => { },
// }