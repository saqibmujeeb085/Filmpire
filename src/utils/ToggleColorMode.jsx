import React, { createContext, useMemo, useState } from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';


export const ColorModeContext = createContext();

const ToggleColorMode = ({children}) => {
    
    const [mode, setMode] = useState('light');
    
    const toggleColorModeSwitch = () => {
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light')
    }

    const theme = useMemo(() => createTheme({
        palette: {
         mode,
        },
     }), [mode]);

  return (
   <ColorModeContext.Provider value={{mode, setMode, toggleColorModeSwitch}}>
      <ThemeProvider theme={theme}>
       {children}
      </ThemeProvider>
   </ColorModeContext.Provider>
  )
}

export default ToggleColorMode;
