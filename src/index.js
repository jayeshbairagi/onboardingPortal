import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Container } from '@mui/material';
import theme from './theme';
import Header from './Components/Header';
import Footer from './Components/Footer';
import UserHomepage from './Components/UserHomepage';
import ClientHomepage from './Components/ClientHomepage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/user-registration/:userId",
    element: <UserHomepage />,
  },
  {
    path: "/",
    element: <ClientHomepage />,
  }
]);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <Container maxWidth='100%' disableGutters>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </Container>
    </React.StrictMode>
  </ThemeProvider>,
);
