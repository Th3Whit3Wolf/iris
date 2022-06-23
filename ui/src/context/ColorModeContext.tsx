import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { getDesignTokens } from "#themes";
import PropTypes from "prop-types";
import {
	FunctionComponent,
	useState,
	createContext,
	useMemo
} from "react";

const ColorModeContext = createContext({} as IColorModeContext);

const ColorModeProvider: FunctionComponent<ColorModePoviderProps> = ({
	children
}) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? "dark" : "light");
	const value = useMemo(
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
		<ColorModeContext.Provider
			value={
				value
			}
		>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

ColorModeProvider.propTypes = {
	children: PropTypes.any
};

export { ColorModeProvider, ColorModeContext };
