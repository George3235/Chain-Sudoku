import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FaEraser } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { useState, type JSX } from "react";

// Bilden för Easy
import easy from "../../assets/Easy_Blank.png";

type Cell = {
  row: number;
  column: number;
  init?: number;
  use?: number;
};

// Lista med Easy bräda

const Easy : Cell[] = [

  // Rad 0
  {row: 0, column: 5, init:7},
  {row: 0, column: 6, init:6},
  {row: 0, column: 7, init:1},

  // Rad 1
  {row: 1, column: 0, init:5},
  {row: 1, column: 1, init:7},
  {row: 1, column: 2, init:1},
  {row: 1, column: 3, init:2},
  {row: 1, column: 4, init:3},
  {row: 1, column: 5, init:8},
  {row: 1, column: 6, init:9},
  {row: 1, column: 7, init:4},

  // Rad 2
  {row: 2, column:1, init:8},
  {row: 2, column:3, init:7},
  {row: 2, column:4, init:4},
  {row: 2, column:5, init:9},
  {row: 2, column:7, init:5},

  // Rad 3
  {row: 3, column:0, init:2},
  {row: 3, column:3, init:1},
  {row: 3, column:4, init:6},
  {row: 3, column:6, init:7},
  {row: 3, column:7, init:9},
  {row: 3, column:8, init:8},

  // Rad 4
  {row: 4, column:0, init:9},
  {row: 4, column:1, init:6},
  {row: 4, column:2, init:2},
  {row: 4, column:7, init:8},

  // Rad 5
  {row: 5, column:0, init:4},
  {row: 5, column:2, init:5},
  {row: 5, column:3, init:8},
  {row: 5, column:5, init:1},
  {row: 5, column:6, init:2},
  {row: 5, column:7, init:6},
  {row: 5, column:8, init:9},

  // Rad 6
  {row:6, column:1, init: 9},
  {row:6, column:4, init: 2},
  {row:6, column:5, init: 4},
  {row:6, column:6, init: 3},
  {row:6, column:8, init: 5},

  // Rad 7
  {row:7, column:0, init: 7},
  {row:7, column:1, init: 4},
  {row:7, column:2, init: 6},
  {row:7, column:4, init: 8},
  {row:7, column:5, init: 2},
  {row:7, column:6, init: 5},
  {row:7, column:7, init: 3},
  {row:7, column:8, init: 1},

  // Rad 8
  {row: 8, column:0, init: 3},
  {row: 8, column:2, init: 7},
  {row: 8, column:4, init: 9},
  {row: 8, column:5, init: 6},
  {row: 8, column:7, init: 2},

]
// En funktion skapar en tom bräda där varje cell är av typen Cell
function createBoard(inti: Cell[]): Cell[] {
  const emptyBoard: Cell[] = [];
  for (let row=0; row<9; row++) {
    for (let column=0; column<9; column++) {
      
      const initValue = inti.find(
        (c) => c.row === row && c.column === column
      )
      // Om initial value finns
      if(initValue) {
        emptyBoard.push({row, column, init: initValue.init});
      } 
      // Om initial value ej finns 
      else {
        emptyBoard.push({row, column})
      }
    }
  }
  return emptyBoard;
}

const MainBox = () => {
  // En State som fyller i Bräda i UI
  const [board, setBoard] = useState<Cell[]> (() => createBoard(Easy));
  // För att skapa cellerna
  const boxes: JSX.Element[] = [];

  for(let row = 0; row <9; row++) {
    for(let column=0; column <9; column++) {

      const position = row * 9 + column;
      const cell = board[position];

      const showVal = cell?.init ?? cell?.use ?? ""

      boxes.push(
        <Box key={`${row}-${column}`}
          sx={{cursor:"pointer", 
             // Den med border ska man ta bort
             border:"1px solid rgba(255,250,250,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}

          onClick={() => {
            console.log("Clicked cell", { row, col: column });
          }}
        >
          {showVal}
        </Box>
      )
    }
  }
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#363d44ff", height: "75vh" }}
    >
      {/*Definerar områden för Själva Cirklarna grid och allt annat */}
      <Grid container sx={{ height: "100%" }}>
          {/* Den delen innehåller själva området för spelet */}
        <Grid
          size={8}
          maxWidth="lg"
          sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}
        >
          {/*Området som innehåller bilden */}
          <Box sx={{position:'relative', width:"100%", maxWidth:600, aspectRatio:"1/1", backgroundImage:`url(${easy})`, backgroundSize:"contain", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
            {/*Själva Table med rutorna */}
            <Box sx={{position:"absolute", inset:0, display:"grid", gridTemplateRows: "repeat(9,1fr)", gridTemplateColumns: "repeat(9,1fr)" }}>
              {/* Skapar 81 rutor inne i table */}
              {boxes}
            </Box>
          </Box>
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
