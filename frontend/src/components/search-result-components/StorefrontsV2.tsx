import * as React from "react";
import { Box, Stack, Paper, Card, Typography, Grid, Pagination, ImageList, ImageListItem } from '@mui/material';

// components
import ProductPreviewV2 from './ProductPreviewV2';
import TagButton from './TagButton';

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
		setPage(1); // reset the page number back to one
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
		<Stack direction={{ xs: "column", sm: "column", md: "row" }} spacing={3}>
			{/* Left */}
			<Box sx={{ width: {md: "250px"} }}>
				<Paper
					variant="outlined"
					sx={{
						height: 1,
						borderRadius: "10px",
						padding: "10px"
					}}>
					<Box>
						<Typography variant="h5">Filters</Typography>
						<Grid container>
							{allTags.map((tag, idx) =>
								<Grid item xs={4} md={12}>
									<TagButton key={idx} title={tag} active={selectedTags.has(tag)} onClick={() => toggleTag(tag)}></TagButton>
								</Grid>)}
						</Grid>
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