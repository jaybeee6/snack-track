import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthListener } from './components/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthListener>
    <App />
  </AuthListener>
  </StrictMode>,
)
