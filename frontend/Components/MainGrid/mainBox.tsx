import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { LuEraser } from "react-icons/lu";
import { FaPencil } from "react-icons/fa6";
import { FaEraser } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { LuPenOff } from "react-icons/lu";
import { useState } from "react";

import Board from "./Board"
import type {Difficulty} from "../../src/puzzles/Puzzles"
import { EASY_INITIAL_CELLS } from "../../src/puzzles/Puzzles";
const MainBox = () => {
  // RAKT FRÅN CHAT
  const [difficulty] = useState<Difficulty>("easy"); // sen kopplar du till navbar-knappar
  const [cells, setCells] = useState(EASY_INITIAL_CELLS);
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#212529ff", height: "60vh" }}
    >
      {/*Definerar områden för Själva Cirklarna grid och allt annat */}
      <Grid container sx={{ height: "100%" }}>
        {/*RAKT FRÅN CHAT */}
        <Grid
          size={8}
          maxWidth="lg"
          sx={{ background: "#212529ff", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}
        >
          <Board
            difficulty={difficulty}
            cells={cells}
            onCellClick={(cell) => {
              // här kommer du senare uppdatera state beroende på vald siffra
              console.log("clicked cell", cell);
            }}
          />
          {/* Den delen innehåller själva området för spelet */}
        </Grid>
        <Grid size={4} sx={{ height: "100%" }}>
          {/* Deb delen innehåller området för hjälpmedel */}
          <Grid
            container
            sx={{ flex: 1, height: "100%" }}
            direction="column"
          >
            {/* Container för Numbers */}
            <Grid
              sx={{
                flex: 1,
                height: "100%",
                justifyContent: "flex-end",
                display: "flex",
                flexDirection: " column",
              }}
            >
              {/* Boxen som innehåller alla Button med Siffrorna*/}
              <Box
                sx={{
                  m: 2,
                  height: "50%",
                  borderRadius: 2,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(3, 1fr)",
                  gap: 1,
                  p: 1,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2">1</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2"> 2</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2">3</Typography>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2">4</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2">5</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2">6</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2">7</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2">8</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Typography variant="h2">9</Typography>
                </Button>
              </Box>
            </Grid>
            {/* Container för help btn:s */}
            <Grid
              sx={{  flex: 1, height: "100%" }}
            >
              <Box
                sx={{
                  m: 2,
                  height: "20%",
                  borderRadius: 2,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 1,
                  p: 1,
                }}
              >
                <Button size="large" sx={{ borderRadius: 25 }}>
                  <FaEraser size={70} />
                </Button>
                <Button size="large" sx={{ borderRadius: 25 }}>
                     <FaLightbulb size={70} />
                  
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default MainBox;
