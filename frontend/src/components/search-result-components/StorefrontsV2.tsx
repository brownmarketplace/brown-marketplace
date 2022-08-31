import * as React from "react";
import { useSearchParams } from 'react-router-dom';
import { Box, Stack, Paper, Card, Typography, Grid, Pagination } from '@mui/material';

// components
import ProductPreviewV2 from './ProductPreviewV2';
import TagButton from './TagButton';
import SortingDropdown from './SortingDropdown';

// types
import { ProductInfo } from "../../models/types";

//#region utils
function numActiveTags(product: ProductInfo, selectedTags: Set<string>): number {
	return product.tags.reduce((counter, tag) => counter + (selectedTags.has(tag) ? 1 : 0), 0);
}

// TODO: Adjust the number of products to fit the display
const NUMBER_PRODUCTS_PER_PAGE: number = 8;
function properNumPages(numProducts: number): number {
	return Math.ceil(numProducts / NUMBER_PRODUCTS_PER_PAGE);
}
//#endregion

type StoreFrontV2Props = {
	products: ProductInfo[],
	selectedTags: string[],
};

export default function StorefrontV2(props: StoreFrontV2Props) {
	// filter by tags
	const [allTags, setAllTags] = React.useState<string[]>([]);
	const [selectedTags, setSelectedTags] = React.useState<Set<string>>(new Set(props.selectedTags));
	// product sorting
	const [sortedProducts, setSortedProducts] = React.useState<ProductInfo[]>(props.products);
	// pagination
	const [numPages, setNumPages] = React.useState<number>(properNumPages(props.products.length));
	const [page, setPage] = React.useState<number>(1);

	function toggleTag(tagName: string): void {
		if (selectedTags.has(tagName)) {
			selectedTags.delete(tagName);
			setSelectedTags(new Set(selectedTags));
		} else {
			selectedTags.add(tagName);
			setSelectedTags(new Set(selectedTags));
		}
	}

	function sortProducts(products: ProductInfo[]): void {
		const sorted = [...products].sort((a, b) => - numActiveTags(a, selectedTags) + numActiveTags(b, selectedTags));
		setSortedProducts(sorted);
	}

	function sortUniqueTags(products: ProductInfo[]): void {
		const unique: Set<string> = new Set();
		products.forEach(product => product.tags.forEach(tag => unique.add(tag)));
		const sorted = Array.from(unique.values()).sort(); // [[...unique]
		setAllTags(sorted);
	}

	React.useEffect(() => {
		sortProducts(props.products);
	}, [selectedTags])

	React.useEffect(() => {
		sortUniqueTags(props.products);
		sortProducts(props.products);
		setNumPages(properNumPages(props.products.length));
	}, [props.products])

	return (
		<Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
			{/* Left */}
			<Box sx={{ width: "250px" }}>
				<Paper
					variant="outlined"
					sx={{
						minHeight: "90%",
						borderRadius: "10px",
						padding: "10px"
					}}>
					{/* <SortingDropdown /> */}
					<Box>
						{/* <Typography variant="h5">Filter by categories</Typography>
						<Stack alignItems="flex-start">
							{allCategories.map((tag, idx) =>
								<TagButton key={idx} title={tag} active={selectedTags.has(tag)} onClick={() => toggleTag(tag)}></TagButton>
							)}
						</Stack>
						<Typography variant="h5">Filter by subcategories</Typography>
						<Stack alignItems="flex-start">
							{allSubcategories.map((tag, idx) =>
								<TagButton key={idx} title={tag} active={selectedTags.has(tag)} onClick={() => toggleTag(tag)}></TagButton>
							)}
						</Stack> */}
						<Typography variant="h5">Filters</Typography>
						<Stack alignItems="flex-start">
							{allTags.map((tag, idx) =>
								<TagButton key={idx} title={tag} active={selectedTags.has(tag)} onClick={() => toggleTag(tag)}></TagButton>
							)}
						</Stack>
					</Box>
				</Paper>
			</Box>

			{/* Right */}
			<Box sx={{ width: "100%" }}>
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
};