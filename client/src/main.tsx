import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from "react-router-dom";
import InitUser from './components/InitUser.tsx';
import { ThemeProvider } from "./context/ThemeContext";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}
const queryClient=new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
          <InitUser />
          <App />
          <Toaster/>
          </BrowserRouter>
        </QueryClientProvider>
      
      </ThemeProvider>

    </ClerkProvider>


  </StrictMode>
);

