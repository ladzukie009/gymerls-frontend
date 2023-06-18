import * as React from "react";
import { useEffect, useState } from "react";
import { Paper, Grid, Typography, Stack } from "@mui/material";
import { Image } from "mui-image";

function Landing() {
  const [greet, setGreet] = useState("");
  const [dateNow, setDateNow] = useState(new Date());
  const [currentUser, getCurrentUser] = useState("");

  useEffect(() => {
    getTime();
    setDateNow(new Date());
    getCurrentUser(localStorage.getItem("username"));
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
      <Stack>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item md={6}>
            <Typography variant="h3" sx={{}}>
              Dashboard
            </Typography>
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="h5">
              {dateNow.toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </Grid>
        </Grid>
        <Grid sx={{ position: "relative" }}>
          <Grid
            sx={{
              position: "absolute",
              right: "12rem",
              top: "-5rem",
              height: "16rem",
              display: { xs: "none", sm: "none", md: "block" },
            }}
          >
            <Image src="../images/biking.gif" alt="biking.gif" />
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={{ marginY: 2 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 5,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Good {greet}, <b>{currentUser}</b>
          </Typography>
          <Typography variant="h5">Today it's great day to be fit!</Typography>
        </Paper>
      </Stack>

      <Stack>
        <Paper elevation={3}>
          <Typography variant="h5"></Typography>
        </Paper>
      </Stack>
    </>
  );
}

export default Landing;
