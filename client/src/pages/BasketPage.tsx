import { Box, Button, ListItemIcon, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import BasketTable from "../components/basketTable/BasketTable";
import ShoppingBagIcon from "../images/shopping-bag.png";
import BasketSummary from "../components/basket/BasketSummary";
import EmptyBasket from "../components/helper/EmptyBasket";
import { useAppSelector } from "../redux/store/configureStore";
import {
  calculateDeliveryFee,
  calculateSubtotalCount,
} from "../util/tableSummaryUtil";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket || !basket.items.length) return <EmptyBasket />;

  const subtotalCount = calculateSubtotalCount(basket?.items || []);

  const deliveryFee = calculateDeliveryFee(subtotalCount);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography gutterBottom variant="h2">
        Your Basket
        <ListItemIcon>
          <img
            src={ShoppingBagIcon}
            alt="Shopping Bag"
            style={{ marginLeft: 10, height: "7vh" }}
          />
        </ListItemIcon>
      </Typography>

      <BasketTable items={basket.items} />
      <BasketSummary subtotal={subtotalCount} deliveryFee={deliveryFee} />
      <Button
        component={RouterLink}
        to="/checkout"
        variant="contained"
        color="success"
        sx={{ mb: "5%", mt: "1%" }}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default BasketPage;
