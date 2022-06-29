import { useLocalStorage, useMediaQuery, useUpdateEffect } from "#hooks";
import { getDesignTokens } from "#themes";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import PropTypes from "prop-types";
import { FunctionComponent, createContext, useMemo } from "react";

const ColorModeContext = createContext({} as IColorModeContext);
const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const ColorModeProvider: FunctionComponent<ColorModePoviderProps> = ({
	children
}) => {
	const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
	const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
		"dark-mode",
		isDarkOS ?? false
	);

	// Update darkMode if os prefers changes

	useUpdateEffect(() => {
		setDarkMode(isDarkOS);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDarkOS]);

	const value = useMemo(
		() => ({
			isDarkMode: () => isDarkMode,
			// The dark mode switch would invoke this method
			toggleColorMode: () => setDarkMode(prev => !prev),
			enable: () => (!isDarkMode ? setDarkMode(true) : undefined),
			disable: () => (isDarkMode ? setDarkMode(false) : undefined)
		}),
		[]
	);
	const theme = useMemo(
		() => createTheme(getDesignTokens(isDarkMode ? "dark" : "light")),
		[isDarkMode]
	);

	return (
		<ColorModeContext.Provider value={value}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

ColorModeProvider.propTypes = {
	children: PropTypes.any
};

export { ColorModeProvider, ColorModeContext };
