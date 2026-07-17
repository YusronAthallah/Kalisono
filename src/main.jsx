import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteDataProvider } from './context/SiteDataContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteDataProvider>
      <App />
    </SiteDataProvider>
  </StrictMode>,
)
