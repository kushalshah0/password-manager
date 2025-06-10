import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StatesProvider } from './context/states.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StatesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StatesProvider>
  </StrictMode>,
)