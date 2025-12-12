import './index.css'
import Box  from '@mui/material/Box' 
import NavAppBar from './Components/Navbar/navbar.tsx'
import MainBox from './Components/MainGrid/mainBox.tsx'
import { useState } from 'react'
import {updateLevelState, type Levels} from './Components/MainGrid/Game.ts'
function App() {

  const [leveltitle, setLeveltitle] = useState<Levels>("Easy");
  const { level, img} = updateLevelState(leveltitle)
  return (
    <Box sx={{ minHeight:"100vh", display:"flex", flexDirection:"column"}}>
      <NavAppBar onChangeLvl={(newLVL: Levels ) => setLeveltitle(newLVL)} />
      <Box sx={{flex:1, display:"flex", alignItems: "center", justifyContent:"center"}}>
        <MainBox Level_instance={level} backgroundImg= {img} difficulty={leveltitle} key={leveltitle}/>
      </Box>
    </Box>
  );
}

export default App;