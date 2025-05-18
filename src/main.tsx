import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { CustomTitleBar } from './components/ui/title-bar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CustomTitleBar title="Vite + React + TS + Electron Starter" />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
