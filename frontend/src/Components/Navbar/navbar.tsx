import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { Button } from "@mui/material";

import { type Levels} from "../MainGrid/Game"

interface NavProps {
  onChangeLvl : (lvl: Levels) => void;
}

const NavAppBar = ({onChangeLvl}:NavProps) => {
  const [levels, setLevels] = React.useState("Easy")
  // Om man trycker på Easy Knappen
  const easyHandler = () => {
    setLevels("Easy")
    onChangeLvl("Easy")
  }

  // Om man trycker på medium knappen
  const mediumHandler = () => {
    setLevels("Medium")
    onChangeLvl("Medium")
  }

  // Om man trycker på hard knappen 
  const hardHandler = () => {
    setLevels("Hard")
    onChangeLvl("Hard")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#212529ff", // Navbar Bakgrund färgen
          boxShadow: "none", // För att ta bort skuggan
          height:"5vh"
        }}
      >
        <Toolbar sx={{height:"10vh"}}>
          <IconButton color="inherit">
            <BsGrid3X3GapFill size={40} />
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
            <Button size="large" variant={levels === "Easy" ? "outlined" : "contained" }>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                color="#ffff"
                onClick={() => easyHandler()}
              >
                Easy
              </Typography>
            </Button>
            <Button size="large" variant = {levels === "Medium" ? "outlined" : "contained"}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                color="#ffff"
                onClick={() => mediumHandler()}
              >
                Medium
              </Typography>
            </Button>
            <Button size="large" variant= {levels === "Hard" ? "outlined" : "contained"}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                color="#ffff"
                onClick={() => hardHandler()}
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
