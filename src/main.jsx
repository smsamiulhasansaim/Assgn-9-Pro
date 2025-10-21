import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer,} from 'react-toastify';
import { RouterProvider } from "react-router/dom";
import { router } from './app/routes/PublicRoute';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  <ToastContainer />
  </StrictMode>,
)
