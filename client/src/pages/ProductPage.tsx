import ProductList from "../components/product/ProductList";
import { useEffect, useRef } from "react";
import Loading from "../components/helper/Loading";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productsSelectors,
  setPageNumber,
  setProductParams,
} from "../redux/productSlice";
import Slider from "../components/helper/Slider";
import { PaginationComponent } from "../components/dataControls";
import CustomTypography from "../components/helper/CustomTypography";
import ProductFilter from "../components/ProductFilter";

const ProductPage = () => {
  const products = useAppSelector(productsSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <Loading message="Loading products..." />;

  const handleSearchInputChange = (event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  };

  const handlePageChange = (page: number) => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
    dispatch(setPageNumber({ pageNumber: page }));
  };

  return (
    <>
      <Slider />

      <Box
        ref={containerRef}
        sx={{
          padding: "20px",
          margin: "0 auto",
          maxWidth: "1390px",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item marginTop="1vh">
            <CustomTypography variant="h5" fontSize={30} paddingTop="13%">
              All Products:
            </CustomTypography>
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ xs: 0, sm: 3, lg: 6 }}>
          {isMediumScreen ? (
            <Grid item xs={12} md={9}>
              <ProductFilter
                productParams={productParams}
                brands={brands}
                types={types}
                onSearchChange={handleSearchInputChange}
              />
              <CustomTypography variant="h6" fontSize={28} marginTop={1}>
                Filter Results:
              </CustomTypography>
            </Grid>
          ) : (
            <Grid item xs={12} md={3}>
              <ProductFilter
                productParams={productParams}
                brands={brands}
                types={types}
                onSearchChange={handleSearchInputChange}
              />
            </Grid>
          )}

          <Grid item xs={12} md={isMediumScreen ? 3 : 9}>
            {productsLoaded ? (
              <ProductList products={products} />
            ) : (
              <Loading message="Loading products..." productsLoaded />
            )}
            {metaData && (
              <Grid item xs={12}>
                <PaginationComponent
                  metaData={metaData}
                  onPageChange={handlePageChange}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductPage;
