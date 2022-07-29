import * as React from "react";
import { Box, Stack, Typography, Grid, Pagination } from '@mui/material';

// components
import ProductPreviewV2 from './ProductPreviewV2';
import TagButton from './TagButton';
import SortingDropdown from './SortingDropdown';

type ProductInfo = {
	id: number,
	name: string,
	price: number,
	description: string,
	pictures: string[],
	tags: string[],
};

type StoreFrontV2Props = {
	products: ProductInfo[],
	tags: string[],
};

const NUMBER_PRODUCTS_PER_PAGE: number = 8;

export default function StorefrontV2(props: StoreFrontV2Props) {
	const {
		products,
		tags,
	}: StoreFrontV2Props = props;

	// filter by tags
	const [selectedTags, setSelectedTags] = React.useState<Set<string>>(new Set());

	function toggleTag(tagName: string): void {
		if (selectedTags.has(tagName)) {
			selectedTags.delete(tagName);
			setSelectedTags(new Set(selectedTags));
		} else {
			selectedTags.add(tagName);
			setSelectedTags(new Set(selectedTags));
		}
	}

	// product sorting
	const [sortedProducts, setSortedProducts] = React.useState<ProductInfo[]>([...products]);

	function numActiveTags(product: ProductInfo): number {
		return product.tags.reduce((counter, tag) => counter + (selectedTags.has(tag) ? 1 : 0), 0);
	}

	React.useEffect(() => {
		let sorted = [...products].sort((a, b) => - numActiveTags(a) + numActiveTags(b));
		setSortedProducts(sorted);
	}, [products, selectedTags])

	// TODO: Adjust the number of products to fit the display
	// pagination
	const [page, setPage] = React.useState<number>(1);

	const numPages = Math.ceil(products.length / NUMBER_PRODUCTS_PER_PAGE);

	return (
		<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
			{/* Left */}
			<Box>
				<SortingDropdown />
				<Box sx={{ width: "200px" }}>
					<Typography variant="h5">Filter by tags</Typography>
					<Stack>
						{tags.map((tag, idx) =>
							<TagButton key={idx} title={tag} active={selectedTags.has(tag)} onClick={() => toggleTag(tag)}></TagButton>
						)}
					</Stack>
				</Box>
			</Box>

			{/* Right */}
			<Box>
				<Stack alignItems="center" spacing={3}>
					<Grid container spacing={3}>
						{sortedProducts.slice((page - 1) * NUMBER_PRODUCTS_PER_PAGE, page * NUMBER_PRODUCTS_PER_PAGE).map((productInfo, idx) =>
							<Grid item key={idx} xs={6} md={4} lg={3} display="flex">
								<ProductPreviewV2 productInfo={productInfo} selectedTags={selectedTags} tagOnClick={toggleTag} />
							</Grid>)}
					</Grid>
					<Pagination count={numPages} page={page} onChange={(event, value) => { setPage(value); }} />
				</Stack>
			</Box>
		</Stack>
	)
};

StorefrontV2.defaultProps = {
	products: Array(5).fill([
		{
			id: 1,
			name: "Luxury Table Set",
			price: 669.99,
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
			pictures: ["https://assets.weimgs.com/weimgs/ab/images/wcm/products/202217/0067/tripod-dining-table-walnut-c.jpg"],
			tags: ["Furniture", "Vintage", "Nature", "Decoration"],
		},
		{
			id: 2,
			name: "Rocking Chair",
			price: 6.99,
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
			pictures: ["https://cdn.shopify.com/s/files/1/2505/7782/products/ND-15-SU_Nanny_4569_1200x.jpg?v=1647915690"],
			tags: ["Furniture", "Vintage", "Nature", "Decoration", "Rocking Chair"],
		},
		{
			id: 3,
			name: "Leather Sofa",
			price: 669.99,
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis ex interdum, convallis erat ac, aliquam tellus. Fusce at ornare libero. Pellentesque ornare, lectus ac luctus vestibulum, massa eros sagittis nibh, ac dignissim quam dui vel massa. Aliquam ultrices ac nisl sit amet facilisis. Sed finibus lectus at eros hendrerit, quis fringilla neque posuere. Aliquam vel molestie est. Sed non commodo lorem, at porta diam. Morbi ac tortor eget arcu blandit interdum ut dictum sem. Fusce imperdiet rhoncus hendrerit.",
			pictures: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxr5qIE2fBN0dfocC7TQ3VV49Y0-fE0lzexGpAf_1BqdkWrEOzVc9ki8_h1ids-xrglT4&usqp=CAU"],
			tags: ["Furniture", "Vintage", "Decoration", "Sofa"],
		},
		{
			id: 4,
			name: "Free Lamp",
			price: 0.99,
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			pictures: ["https://images.dunelm.com/30674209.jpg?$standardplayerdefault$&img404=noimagedefault"],
			tags: ["Furniture", "Free"],
		},
		{
			id: 5,
			name: "Carpet",
			price: 69.99,
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor dui.",
			pictures: ["https://stylesatlife.com/wp-content/uploads/2021/03/Best-Floor-Carpet-Designs.jpg"],
			tags: ["Furniture"],
		},
	]).flat(),
	tags: ["Furniture", "Vintage", "Decoration", "Rocking Chair", "Sofa", "Nature", "Free"],
};