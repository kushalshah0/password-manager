import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { StatesProvider } from './context/states.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <StatesProvider>
    <App />
  </StatesProvider>
  </StrictMode>,
)
