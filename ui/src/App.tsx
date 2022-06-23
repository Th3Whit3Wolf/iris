import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useMemo, useState } from "react";
import {
	createTheme,
	ThemeProvider,
	useMediaQuery,
  PaletteMode
} from "@mui/material";
import { ColorModeContext } from "#context";
import { getDesignTokens} from "#themes";
import { Login, Header, Footer, Body, StudentStack, InstructorStack } from './components';


const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? "dark" : "light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === "light" ? "dark" : "light"));
      }
    }),
    []
  );
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <Router basename={`${process.env.PUBLIC_URL}/`}>
        <Header />
        <Body>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/student' element={<StudentStack />} />
            <Route path='/instructor' element={<InstructorStack />} />
            <Route path='*' element={<Login />} />
          </Routes>
        </Body>
        <Footer />
      </Router>
      
    </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App