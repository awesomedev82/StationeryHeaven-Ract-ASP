import { Product } from "../models/product";
import ProductList from "../components/product/ProductList";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import agent from "../api/agent";
import { Box, Container, Divider, Grid } from "@mui/material";
import Slider from "../components/Slider";
import ProductCard from "../components/product/ProductCard";
import ProductRandom from "../components/product/ProductRandom";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Product.list()
      .then((products) => setProducts(products))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading products..." />;

  return (
    <>
      <Slider />

      <Container style={{ maxWidth: "1200px" }}>
      <ProductRandom products={products} />
      </Container>
      <Divider sx={{ paddingTop: "5%" }} />

      <Container style={{ maxWidth: "1350px" }}>
        <ProductList products={products} />
      </Container>
    </>
  );
};

export default ProductPage;
