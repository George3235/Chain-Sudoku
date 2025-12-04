import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Testar Components med den 
import NavAppBar from '../Components/Navbar/navbar.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavAppBar />
  </StrictMode>,
)
