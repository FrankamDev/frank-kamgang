import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import "./i18n/index";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider>

    <AuthProvider>
        <App />
      </AuthProvider>
     </ThemeProvider>
  </StrictMode>,
)
