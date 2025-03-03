import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/assets/styles/index.css'
import App from "./services/App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
