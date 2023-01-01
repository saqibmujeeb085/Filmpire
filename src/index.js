import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({});
const Container = document.getElementById('root');
const root = ReactDOM.createRoot(Container);
root.render(
 <ThemeProvider theme={theme}>
  <BrowserRouter>
   <App/>
  </BrowserRouter>
 </ThemeProvider>
);