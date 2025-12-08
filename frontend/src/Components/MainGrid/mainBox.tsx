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

// Typ för cellerna
type Cell = {
  row: number;
  column: number;
  given?: number; // Initial Siffran
  value?: number; // Användarens inmatning
}


const MainBox = () => {
  //const [cells, setCells] = useState<Cell[]>(/* Init */);
  // För att skapa cellerna
  const cells: JSX.Element[] = [];

  for(let row = 0; row <9; row++) {
    for(let column=0; column <9; column++) {
      cells.push(
        <Box key={`${row}-${column}`}
          sx={{cursor:"pointer", 
             // Den med border ska man ta bort
             border:"1px solid rgba(255,250,250,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}

          onClick={() => {
            console.log("Clicked cell", { row, column });
          }}
        />
      )
    }
  }
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#212529ff", height: "75vh" }}
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
              {cells}
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
