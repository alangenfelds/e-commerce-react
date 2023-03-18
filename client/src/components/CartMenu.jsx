import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";

import { shades } from "../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../state";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);

  return (
    <Box // overlay
      display={isCartOpen ? "block" : "none"}
      bgcolor="rgba(0,0,0,0.4)"
      position="fixed"
      width="100%"
      height="100%"
      left={0}
      top={0}
      overflow="auto"
      zIndex={1000}
    >
      {/* MODAL */}
      <Box
        position="fixed"
        right={0}
        bottom={0}
        width="max(400px, 40%)"
        height="100%"
        bgcolor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* modal header */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING CART ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen())}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* Cart List */}
        </Box>
      </Box>
    </Box>
  );
};

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default CartMenu;
