import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Paper, Grid, Typography } from "@mui/material";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

function Landing() {
  const [greet, setGreet] = useState("");
  const [currentUser, getCurrentUser] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    getTime();
    getCurrentUser(localStorage.getItem("username"));

    fetch("https://gymerls.cyclic.app/api/get-user-by-role", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        added_by: localStorage.getItem("username"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.length);
      });

    fetch("https://gymerls.cyclic.app/api/get-product", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        added_by: localStorage.getItem("username"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProductCount(data.length);
      });
  }, []);

  function getTime() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) setGreet("morning");
    else if (hours >= 12 && hours <= 17) setGreet("afternoon");
    else if (hours >= 17 && hours <= 24) setGreet("evening");
  }

  setInterval(function () {
    getTime();
  }, 300000);

  return (
    <>
      <Typography variant="h5" component="h2">
        Good {greet}, <b>{currentUser}</b>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: 300,
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={3} sm={6} xs={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#ffac33",
                color: "#fff",
              }}
            >
              <PermContactCalendarOutlinedIcon sx={{ fontSize: "4rem" }} />
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="button">USERS</Typography>
                <Typography variant="h4">{userCount}</Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={3} sm={6} xs={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#8bc34a",
                color: "#fff",
              }}
            >
              <Inventory2OutlinedIcon sx={{ fontSize: "4rem" }} />
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="button">PRODUCTS</Typography>
                <Typography variant="h4">{productCount}</Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={3} sm={6} xs={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#ff3d00",
                color: "#fff",
              }}
            >
              <EventAvailableOutlinedIcon sx={{ fontSize: "4rem" }} />
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="button">RESERVATIONS</Typography>
                <Typography variant="h4">0</Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={3} sm={6} xs={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#651fff",
                color: "#fff",
              }}
            >
              <LocalMallOutlinedIcon sx={{ fontSize: "4rem" }} />
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="button">ORDERS</Typography>
                <Typography variant="h4">0</Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Landing;
