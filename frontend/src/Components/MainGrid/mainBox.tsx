import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FaEraser } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import {  useState, type JSX } from "react";
import type { Cell } from "../../puzzles/puzzle";
import type { Levels } from "./Game";

// API imports
import {remove_number_req, add_number_req, give_hint_req} from "../../services/util"

// props interace
interface propsmainBox {
  Level_instance: Cell[]; 
  backgroundImg: string;
  difficulty: Levels;
}

// En funktion skapar en tom bräda där varje cell är av typen Cell
function createBoard(inti: Cell[]): Cell[] {
  const emptyBoard: Cell[] = [];
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const initValue = inti.find((c) => c.row === row && c.column === column);
      // Om initial value finns
      if (initValue) {
        emptyBoard.push({ row, column, init: initValue.init, user: initValue.user });
      }
      // Om initial value ej finns
      else {
        emptyBoard.push({ row, column });
      }
    }
  }
  return emptyBoard;
}

// Gör att det finns default värden 
const MainBox = ({Level_instance, backgroundImg, difficulty}: propsmainBox) => {
  
  
  // En State som fyller i Bräda i UI
  const [board, setBoard] = useState<Cell[]>(() => createBoard(Level_instance));

  // State som används för att läsa av vilken cell som användaren trycker på
  const [selected, setSelected] = useState<{
    row: number;
    column: number;
  } | null>(null);

  // Funktionen som hanterar om man trycker på en cell 
  const cellOnclick = (row:number, column:number) => {
    // Då kommer den Raden och Columnen att sparas i selected- variablen
    setSelected({row,column })
  }

  // Funktionen som hanterar när användaren vill ha en ledtråd för en cell
  const hintHandler = async() => {
    // Först kolla ifall användaren trycker på en cell
    if (selected) {
      // Hämtar hela raden från listan 
      //const chosenCell = Level_instance.find(cell => cell.row === selected.row && cell.column === selected.column); 
      const api_req_give_hint = await give_hint_req(selected.row, selected.column, difficulty);

      if ( api_req_give_hint != "0" ){
        console.log("Inne i andra början")
        Level_instance.push({row: selected.row, column: selected.column, user: Number(api_req_give_hint)});
        // Uppdaterar listan 
        setBoard(createBoard(Level_instance))
        console.log("Inne i andra slutet")
        return;
      }
      else {
        return;
      }
    }
  }

  // Funktion som hanterar om användaren vill ta bort ett värde från en lägg
  const deleteHandler = async() => {
    // Först kolla om användaren trycker på en cell
    if(selected) {
      // Hämtar hela raden från listan 
      const chosenCell = Level_instance.find(cell => cell.row === selected.row && cell.column === selected.column); 

      // om det finns ett objekt i listan med den cellen
      if (chosenCell) {
        // Kolla så att dess init är undefined 
        const api_req_remove = await remove_number_req(selected.row, selected.column, difficulty);
        if(!api_req_remove) {
          console.log("Du kan inte ta bort init din åsna")
          return
        }
        

        // Ta reda på cellens index
        const ind = Level_instance.findIndex(cell => cell.row === selected.row && cell.column === selected.column);
        Level_instance.splice(ind, 1)
        // Uppdaterar listan 
        setBoard(createBoard(Level_instance))
        return; 
        
        console.log("Something Wrong 1")
      } 
      console.log("Something Wrong 2")
    }
    console.log("Cellen finns inte med i listan")
  }

  // Funktionen som hanterar om man trycker på en cell och en siffra samtidigt => Lägg till den siffran i den cellen. 
  const handlePressNumber = async (value: number) => {
    
    // Först kolla om användern trycker på en cell
    if(selected) {
      console.log("Inne i första början")
      // Hämtar hela raden från listan 
      const chosenCell = Level_instance.find(cell => cell.row === selected.row && cell.column === selected.column); 
      // Om den är True så ska man lägga till siffran annars nooo (Eller annat)
      const api_req_add = await add_number_req(selected.row, selected.column, value,difficulty);
      // I Början av spelet innehåller listan endast objekt med init value och då finns inte alla 0 till 80 cellerna  
      console.log("Inne i första hämtat API")
      console.log(api_req_add)
      if ((!chosenCell )&& api_req_add) {
        console.log("Inne i andra början")
        Level_instance.push({row: selected.row, column: selected.column, user: value});
        // Uppdaterar listan 
        setBoard(createBoard(Level_instance))
        console.log("Inne i andra slutet")
        return; // Avslutar då
      }
      // Om den raden finns: 
      else if(chosenCell) {
        const api_req_add_redan = await add_number_req(selected.row, selected.column, value,difficulty);
        console.log("Inne i else if början")
        // Kolla om init siffra är undefined (innebär att det är en siffra som användare har skrivit själv)
        if(api_req_add_redan) {
          // Tar reda på indexet för den cellen
          const cellIndex = Level_instance.findIndex(cell => cell.row === selected.row && cell.column === selected.column)  
          // Om den är undefined då uppdaterar vi user input av den cellen  
          Level_instance[cellIndex].user = value
          // Uppdaterar listan 
          setBoard(createBoard(Level_instance))
          return; // Avslutar då
        } else {
          // skriv i Console att det är en init siffra (i vanliga spel ignoreras detta)
          console.log("Init värde kan man inte ändra på")
        }
      }
    }
    console.log("User pressed: ", value)
  }
  // För att skapa cellerna
  const boxes: JSX.Element[] = [];

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const position = row * 9 + column;
      const cell = board[position];

      // Används för att läsa av listan
      const showVal = cell?.init ?? cell?.user ?? "";

      boxes.push(
        <Box
          key={`${row}-${column}`}
          sx={{
            cursor: "pointer",
            // Den med border ska man ta bort
            border: "1px solid rgba(255,250,250,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              selected && selected.row === row && selected.column === column
                ? "rgba(255,255,255,0.15)"
                : "transparent",
            color: cell?.init? "#ffffff" : "#008cffff",
          }}
          //onClick={() => setSelected({ row, column })}
          onClick= {()=> cellOnclick(row, column)}
        >
          {showVal}
        </Box>
      );
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
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/*Området som innehåller bilden */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 600,
              aspectRatio: "1/1",
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/*Själva Table med rutorna */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "grid",
                gridTemplateRows: "repeat(9,1fr)",
                gridTemplateColumns: "repeat(9,1fr)",
              }}
            >
              {/* Skapar 81 rutor inne i table */}
              {boxes}
            </Box>
          </Box>
        </Grid>

        <Grid size={4} sx={{ height: "100%" }}>
          {/* Deb delen innehåller området för hjälpmedel */}
          <Grid container sx={{ flex: 1, height: "100%" }} direction="column">
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

                  onClick={() => handlePressNumber(1)}
                >
                  <Typography variant="h2">1</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handlePressNumber(2)}
                >
                  <Typography variant="h2"> 2</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handlePressNumber(3)}
                >
                  <Typography variant="h2">3</Typography>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handlePressNumber(4)}
                >
                  <Typography variant="h2">4</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handlePressNumber(5)}
                >
                  <Typography variant="h2">5</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handlePressNumber(6)}
                >
                  <Typography variant="h2">6</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handlePressNumber(7)}
                >
                  <Typography variant="h2">7</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handlePressNumber(8)}
                >
                  <Typography variant="h2">8</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => handlePressNumber(9)}
                >
                  <Typography variant="h2">9</Typography>
                </Button>
              </Box>
            </Grid>
            {/* Container för help btn:s */}
            <Grid sx={{ flex: 1, height: "100%" }}>
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
                <Button size="large" sx={{ borderRadius: 25 }} onClick={() => deleteHandler()}>
                  <FaEraser size={70} />
                </Button>
                <Button size="large" sx={{ borderRadius: 25 }} onClick={() => hintHandler()}>
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