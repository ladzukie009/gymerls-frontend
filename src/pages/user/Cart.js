import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // const totalUsingReduce = findSumUsingReduce();

    // console.log("totalUsingReduce", totalUsingReduce);
    // console.log("totalUsingMap", totalUsingMap);

    // var myCart = JSON.parse(localStorage.getItem("cart"));
    // setCart(myCart);
    // objectLength(myCart);
    fetch("http://localhost:3031/api/get-cart-by-id", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        status: "cart",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setCart(result);
        objectLength(result);
        findSumUsingReduce(result);

        let t = 0;
        result.map(({ sub_total }) => (t = t + sub_total));
        setGrandTotal(t);
      });
  }, []);

  function findSumUsingReduce(result) {
    const s = result.reduce((s, { price }) => s + price, 0);
    setTotalAmount(s);
    return s;
  }

  function objectLength(obj) {
    var count = 0;
    for (var k in obj) {
      // if the object has this property and it isn't a property
      // further up the prototype chain
      if (obj.hasOwnProperty(k)) count++;
    }
    setCartItemCount(count);
    return count;
  }

  const incrementQuantity = (id) => {
    findSumUsingReduce(cart);
    setCart((cartItems) =>
      cartItems.map((item) => {
        // id === item.id ? { ...item, item.quantity + 1)  } : item;
        if (id === item.id) {
          item.quantity++;
          item.sub_total = item.quantity * item.price;
        }

        setCart(item);
        mappingPrice();
        return item;
      })
    );
  };

  const mappingPrice = () => {
    let t = 0;
    cart.map(({ sub_total }) => (t = t + sub_total));
    setGrandTotal(t);
    return t;
  };

  const decrementQuantity = (id) => {
    findSumUsingReduce(cart);
    setCart((cartItems) =>
      cartItems.map((item) => {
        // id === item.id ? { ...item, item.quantity + 1)  } : item;
        if (id === item.id) {
          item.quantity--;
          item.sub_total = item.quantity * item.price;
        }

        setCart(item);
        mappingPrice();
        return item;
      })
    );
  };

  const placeOrder = () => {
    console.log(cart);
    console.log(grandTotal);
  };

  return (
    <>
      {cartItemCount === 0 ? (
        <Box>
          <Stack sx={{ display: "flex", alignItems: "center" }}>
            <Grid className="empty-cart">
              <Image
                src="../images/emptyCart.png"
                alt="empty cart"
                showLoading={false}
              />
            </Grid>
          </Stack>
          <Stack sx={{ textAlign: "center" }}>
            <Typography variant="h5">
              Looks like you have not added anything to your cart.
              <br />
              Go ahead and explore our products!
            </Typography>
          </Stack>
          <Stack alignItems={"center"}>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "10rem" }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/store";
              }}
            >
              Explore
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4">My Cart</Typography>
          <Stack>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">{cartItemCount} ITEMS</Typography>
                <Stack>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      borderBottom: "1px solid gray",
                      paddingBottom: 1,
                      marginBottom: 1,
                    }}
                  >
                    <Grid item xs={2} fontWeight={"bold"}>
                      Image
                    </Grid>
                    <Grid item xs={4} fontWeight={"bold"}>
                      Product name
                    </Grid>
                    <Grid item xs={1} fontWeight={"bold"}>
                      Price
                    </Grid>
                    <Grid item xs={3} fontWeight={"bold"} textAlign={"center"}>
                      Quantity
                    </Grid>
                    <Grid item xs={2} fontWeight={"bold"}>
                      Total
                    </Grid>
                  </Grid>
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  {cart.map((item) => {
                    return (
                      <Grid
                        container
                        key={item.id}
                        sx={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          borderBottom: "1px solid gray",
                          paddingBottom: 1,
                        }}
                      >
                        <Grid item xs={2}>
                          <Image
                            src={item.image_url}
                            alt="empty cart"
                            height={50}
                            width={50}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>{item.product_name}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography>{item.price}</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Button onClick={() => decrementQuantity(item.id)}>
                            -
                          </Button>
                          <Typography>{item.quantity}</Typography>
                          <Button onClick={() => incrementQuantity(item.id)}>
                            +
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography>{item.price * item.quantity}</Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Stack>
                <Stack>
                  <Grid container marginTop={2}>
                    <Grid item xs={10}>
                      <Typography variant="h5" fontWeight={"bold"}>
                        TOTAL:
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="h5" fontWeight={"bold"}>
                        {grandTotal}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
                <Stack marginTop={3}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ width: "15rem" }}
                    onClick={() => placeOrder()}
                  >
                    PLACE ORDER
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default Cart;
