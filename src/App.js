import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import Layout from 'scenes/layout/';
import Dashboad from '../src/scenes/dashboard';


function App () {
    const mode = useSelector(state => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path='/' element={<Navigate to={"/dashboard"} replace />} />
                            <Route path='dashboard' element={<Dashboad />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </Router>
        </div>
    );
}

export default App;
