import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Box  from '@mui/material/Box'
// Testar Components med den 
import NavAppBar from '../Components/Navbar/navbar.tsx'
import MainBox from '../Components/MainGrid/mainBox.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Box sx={{ minHeight:"100vh", display:"flex", flexDirection:"column"}}>
      <NavAppBar />
      <Box sx={{flex:1, display:"flex", alignItems: "center", justifyContent:"center"}}>
        <MainBox/>
      </Box>
    </Box>
    
  </StrictMode>,
)
