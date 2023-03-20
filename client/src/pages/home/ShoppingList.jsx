import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";

import Item from "../../components/Item";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  // Fetch items from server
  async function fetchItems() {
    const response = await fetch(
      "http://localhost:1337/api/items?populate=image",
      {
        method: "GET",
      }
    );

    const items = await response.json();
    dispatch(setItems(items.data));
  }

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );

  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );

  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  console.log("items", items);

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={filter}
        onChange={handleFilterChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "&: .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="New arrivals" value="newArrivals" />
        <Tab label="Best Sellers" value="bestSellers" />
        <Tab label="Top Rated" value="topRated" />
      </Tabs>

      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {filter === "all" &&
          items.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
        {filter === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
        {filter === "topRated" &&
          topRatedItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
        {filter === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item key={`${item.name}-${item.id}`} item={item} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
