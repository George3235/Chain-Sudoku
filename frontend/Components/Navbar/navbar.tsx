import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { Button } from "@mui/material";

const NavAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#212529ff", // Navbar Bakgrund färgen
          boxShadow: "none", // För att ta bort skuggan
        }}
      >
        <Toolbar>
          <IconButton color="inherit">
            <BsGrid3X3GapFill size={22} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Chain Sudoku
          </Typography>

          {/* Högra sidan med knappar och svårigheten */}
          <Grid container spacing={2} alignItems="center">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Difficulty
            </Typography>
            <Button size="large" variant="outlined">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                color="#ffff"
              >
                Easy
              </Typography>
            </Button>
            <Button size="large" variant="contained">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                color="#ffff"
              >
                Medium
              </Typography>
            </Button>
            <Button size="large" variant="contained">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                color="#ffff"
              >
                Hard
              </Typography>
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavAppBar;
