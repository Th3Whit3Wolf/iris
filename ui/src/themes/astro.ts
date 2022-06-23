import RobotoMonoWoff from "#assets/fonts/roboto-mono-v21-latin-regular.woff";
import RobotoMonoWoff2 from "#assets/fonts/roboto-mono-v21-latin-regular.woff2";
import RobotoWoff from "#assets/fonts/roboto-v29-latin-regular.woff";
import RobotoWoff2 from "#assets/fonts/roboto-v29-latin-regular.woff2";
import { PaletteMode } from "@mui/material";

const fontFamily = [
	"Roboto",
	"BlinkMacSystemFont",
	"-apple-system",
	"Segoe UI",
	"Oxygen",
	"Ubuntu",
	"Cantarell",
	"Fira Sans",
	"Droid Sans",
	"Helvetica Neue",
	"Helvetica",
	"Montserrat",
	"Arial",
	"sans-serif",
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"',
	'"Segoe UI Symbol"'
].join(",");

/*
 * References
 * Colors: https://www.figma.com/community/file/1014254163928270411
 * Typography: https://www.figma.com/community/file/1014254163928270411
 * Color Names: https://www.astrouxds.com/design-guidelines/color/
 */
const astro = {
	primary: {
		lighten4: "#CBDEE9",
		lighten3: "#98BDD3",
		lighten2: "#649CBD",
		lighten1: "#2F7AA7",
		base: "#005A8f",
		darken1: "#004872",
		darken2: "#003655",
		darken3: "#002439",
		darken4: "#00121C",
		100: "#CBDEE9",
		200: "#98BDD3",
		300: "#649CBD",
		400: "#2F7AA7",
		500: "#005A8f",
		600: "#004872",
		700: "#003655",
		800: "#002439",
		900: "#00121C"
	},
	secondary: {
		lighten4: "#DAEEFF",
		lighten3: "#B7DCFF",
		lighten2: "#92CBFF",
		lighten1: "#6EBAFF",
		base: "#4DACFF",
		darken1: "#3A87CF",
		darken2: "#2B659B",
		darken3: "#1D4367",
		darken4: "#0E2234",
		100: "#DAEEFF",
		200: "#B7DCFF",
		300: "#92CBFF",
		400: "#6EBAFF",
		500: "#4DACFF",
		600: "#3A87CF",
		700: "#2B659B",
		800: "#1D4367",
		900: "#0E2234"
	},
	tertiary: {
		lighten4: "#D4D8DD",
		lighten3: "#A9B2BC",
		lighten2: "#7E8C9B",
		lighten1: "#52667A",
		base: "#274059",
		darken1: "#1F3347",
		darken2: "#172635",
		darken3: "#101923",
		darken4: "#080C11",
		100: "#D4D8DD",
		200: "#A9B2BC",
		300: "#7E8C9B",
		400: "#52667A",
		500: "#274059",
		600: "#1F3347",
		700: "#172635",
		800: "#101923",
		900: "#080C11"
	},
	quaternary: {
		lighten4: "#F5F6F9",
		lighten3: "#EAEEF4",
		lighten2: "#E1E6EF",
		lighten1: "#D7DEE9",
		base: "#CED6E4",
		darken1: "#A4ABB6",
		darken2: "#7B8089",
		darken3: "#51555B",
		darken4: "#292A2D",
		100: "#F5F6F9",
		200: "#EAEEF4",
		300: "#E1E6EF",
		400: "#D7DEE9",
		500: "#CED6E4",
		600: "#A4ABB6",
		700: "#7B8089",
		800: "#51555B",
		900: "#292A2D"
	},
	tag: {
		tag1: {
			lighten4: "#D0F4F",
			lighten3: "#A1E9EB",
			lighten2: "#70DDE0",
			lighten1: "#3ED2D6",
			base: "#00C7CB",
			darken1: "#009FA3",
			darken2: "#00777A",
			darken3: "#035051",
			darken4: "#032828",
			100: "#D0F4F",
			200: "#A1E9EB",
			300: "#70DDE0",
			400: "#3ED2D6",
			500: "#00C7CB",
			600: "#009FA3",
			700: "#00777A",
			800: "#035051",
			900: "#032828"
		},
		tag2: {
			lighten4: "#E4E2F7",
			lighten3: "#C9C5ED",
			lighten2: "#AEA8E5",
			lighten1: "#938BDB",
			base: "#786DD3",
			darken1: "#6058A8",
			darken2: "#48417F",
			darken3: "#302C54",
			darken4: "#18152B",
			100: "#E4E2F7",
			200: "#C9C5ED",
			300: "#AEA8E5",
			400: "#938BDB",
			500: "#786DD3",
			600: "#6058A8",
			700: "#48417F",
			800: "#302C54",
			900: "#18152B"
		},
		tag3: {
			lighten4: "#EDCEF3",
			lighten3: "#DA9CE7",
			lighten2: "#C76ADA",
			lighten1: "#B534CE",
			base: "#A200C1",
			darken1: "#81009A",
			darken2: "#610074",
			darken3: "#41004D",
			darken4: "#200227",
			100: "#EDCEF3",
			200: "#DA9CE7",
			300: "#C76ADA",
			400: "#B534CE",
			500: "#A200C1",
			600: "#81009A",
			700: "#610074",
			800: "#41004D",
			900: "#200227"
		},
		tag4: {
			lighten4: "#F8DDD1",
			lighten3: "#F0BAA3",
			lighten2: "#EA9875",
			lighten1: "#E27545",
			base: "#DA5309",
			darken1: "#AF420A",
			darken2: "#833209",
			darken3: "#572108",
			darken4: "#2b1105",
			100: "#F8DDD1",
			200: "#F0BAA3",
			300: "#EA9875",
			400: "#E27545",
			500: "#DA5309",
			600: "#AF420A",
			700: "#833209",
			800: "#572108",
			900: "#2b1105"
		},
		status: {
			pass: "#015800",
			fail: "#570D01",
			unknown: "#32363A"
		}
	},
	status: {
		critical: {
			400: "#FF5F60",
			500: "#FF3838",
			600: "#FF2A04",
			800: "#B34343",
			900: "#661102"
		},
		serious: {
			500: "#FFB302",
			600: "#FFAF3D",
			900: "#664618"
		},
		caution: {
			400: "#FDED61",
			500: "#FCE83A",
			600: "#FAD800",
			800: "#B1A644",
			900: "#645600"
		},
		normal: {
			400: "#99F666",
			500: "#56F000",
			600: "#00E200",
			800: "#6BAC47",
			900: "#005A00"
		},
		standby: {
			400: "#5CE2FF",
			500: "#64D9FF",
			600: "#2DCCFF",
			800: "#409EB3",
			900: "#285766"
		},
		off: {
			400: "#CED6E4",
			500: "#9EA7AD",
			600: "#8E9AA3",
			900: "#393E41"
		}
	},
	classification: {
		unclassified: "#007A33",
		cui: "#502B85",
		confidential: "0033A0",
		secret: "#C8102E",
		topSecret: "#FF8C00",
		topSecretSCI: "#FCE83A"
	},
	snowflakes: {
		dark: {
			surface: "#1B2D3E",
			selected: "#1C3F5E",
			tableHover: "#374E65",
			listHover: "#142435",
			dialogHeader: "#172533",
			placeholder: "#9FA3A7"
		},
		light: {
			surface: "#FFFFFF",
			selected: "#CEE9FC",
			tableHover: "#A4BCCD",
			listHover: "#E2EDF6",
			dialogHeader: "#F7F8FB",
			placeholder: "#76787D"
		}
	}
};

const getDesignTokens = (mode: PaletteMode) => ({
	astro,
	components: {
		MuiCssBaseline: {
			styleOverrides: `
                /* roboto-regular - latin */
                @font-face {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                src: local(''),
                    url(${RobotoWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url(${RobotoWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                }
				/* roboto-mono-regular - latin */
                @font-face {
                font-family: 'Roboto Mono';
                font-style: normal;
                font-weight: 400;
                src: local(''),
                    url(${RobotoMonoWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url(${RobotoMonoWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                }`
		}
		// MuiButton: {
		// 	styleOverrides: {
		// 		root: {
		// 			textTransform: "none",
		// 			borderStyle: "solid",
		// 			borderWidth: "2px"
		// 		}
		// 	}
		// }
	},
	palette: {
		mode,
		...(mode === "dark"
			? {
					// palette values for dark mode
					active: astro.secondary.darken2,
					background: {
						default: astro.tertiary.darken3,
						paper: astro.snowflakes.dark.surface
					},
					dialogHeader: astro.snowflakes.dark.dialogHeader,
					classification: {
						confidential: astro.classification.confidential,
						cui: astro.classification.cui,
						secret: astro.classification.secret,
						topSecret: astro.classification.topSecret,
						topSecretSCI: astro.classification.topSecretSCI,
						unclassified: astro.classification.unclassified
					},
					gsb: {
						background: astro.tertiary.darken2,
						primary: astro.secondary.base,
						text: "#FFF"
					},
					hover: {
						default: astro.secondary.lighten2,
						list: astro.snowflakes.dark.listHover,
						table: astro.snowflakes.dark.tableHover
					},
					primary: {
						main: astro.secondary.base
					},
					primaryAlt: astro.secondary.darken1,
					selected: astro.snowflakes.dark.selected,
					status: {
						caution: {
							banner: astro.status.caution[400],
							bannerIcon: astro.status.caution[800],
							border: "rgba(0,0,0,0)",
							fill: astro.status.caution[500]
						},
						critical: {
							banner: astro.status.critical[400],
							bannerIcon: astro.status.critical[800],
							border: "rgba(0,0,0,0)",
							fill: astro.status.critical[500]
						},
						normal: {
							banner: astro.status.normal[400],
							bannerIcon: astro.status.normal[800],
							border: "rgba(0,0,0,0)",
							fill: astro.status.normal[500]
						},
						off: {
							banner: astro.status.off[400],
							border: "rgba(0,0,0,0)",
							fill: astro.status.off[500]
						},
						serious: {
							border: "rgba(0,0,0,0)",
							fill: astro.status.serious[500]
						},
						standby: {
							banner: astro.status.standby[400],
							bannerIcon: astro.status.standby[800],
							border: "rgba(0,0,0,0)",
							fill: astro.status.standby[600]
						}
					},
					surface: astro.snowflakes.dark.surface,
					text: {
						banner: {
							light: "#FFF",
							dark: "#000"
						},
						inverse: astro.tertiary.darken4,
						link: {
							hover: astro.secondary.lighten2,
							ready: astro.secondary.base
						},
						placeholder: astro.snowflakes.dark.placeholder,
						primary: "#FFFFFF",
						secondary: astro.tertiary.lighten4,
						selected: {
							hover: astro.secondary.base,
							ready: astro.secondary.base
						},
						tab: {
							hover: astro.secondary.lighten2,
							selected: "#FFF",
							unselected: astro.secondary.base
						}
					}
			  }
			: {
					// palette values for light mode
					active: astro.primary.lighten2,
					background: {
						default: astro.quaternary.lighten3,
						paper: "#FFFFFF"
					},
					dialogHeader: astro.snowflakes.light.dialogHeader,
					classification: {
						confidential: astro.classification.confidential,
						cui: astro.classification.cui,
						secret: astro.classification.secret,
						topSecret: astro.classification.topSecret,
						topSecretSCI: astro.classification.topSecretSCI,
						unclassified: astro.classification.unclassified
					},
					gsb: {
						background: astro.tertiary.darken2,
						primary: astro.secondary.base,
						text: "#FFF"
					},
					hover: {
						default: astro.primary.darken1,
						list: astro.snowflakes.light.listHover,
						table: astro.snowflakes.light.tableHover
					},
					primary: {
						main: astro.primary.base
					},
					primaryAlt: astro.primary.lighten1,
					selected: astro.snowflakes.light.selected,
					status: {
						caution: {
							banner: astro.status.caution[400],
							bannerIcon: astro.status.caution[800],
							border: astro.status.caution[900],
							fill: astro.status.caution[600]
						},
						critical: {
							banner: astro.status.critical[400],
							bannerIcon: astro.status.critical[800],
							border: astro.status.critical[900],
							fill: astro.status.critical[600]
						},
						normal: {
							banner: astro.status.normal[400],
							bannerIcon: astro.status.normal[800],
							border: astro.status.normal[900],
							fill: astro.status.normal[600]
						},
						off: {
							banner: astro.status.off[400],
							border: astro.status.off[900],
							fill: astro.status.off[600]
						},
						serious: {
							border: astro.status.serious[900],
							fill: astro.status.serious[600]
						},
						standby: {
							banner: astro.status.standby[400],
							bannerIcon: astro.status.standby[800],
							border: astro.status.standby[900],
							fill: astro.status.standby[500]
						}
					},
					surface: "#FFFFFF",
					text: {
						banner: {
							light: "#FFF",
							dark: "#000"
						},
						inverse: "#FFFFFF",
						link: {
							hover: astro.primary.darken1,
							ready: astro.primary.base
						},
						placeholder: astro.snowflakes.light.placeholder,
						primary: astro.quaternary.darken4,
						secondary: astro.tertiary.darken3,
						selected: {
							hover: astro.primary.base,
							ready: astro.primary.base
						},
						tab: {
							hover: astro.primary.darken1,
							selected: astro.quaternary.darken4,
							unselected: astro.primary.base
						}
					}
			  })
	},
	typography: {
		fontFamily,
		button: {
			fontFamily
		},
		body1: {
			fontFamily
		},
		body2: {
			fontFamily
		},
		body3: {
			fontFamily
		},
		caption: {
			fontFamily
		},
		h1: {
			fontFamily
		},
		h2: {
			fontFamily
		},
		h3: {
			fontFamily
		},
		h4: {
			fontFamily
		},
		h5: {
			fontFamily
		},
		h6: {
			fontFamily
		},
		mono: {
			fontFamily: "'Roboto Mono', monospace"
		},

		overline: {
			fontFamily
		},
		subtitle1: {
			fontFamily
		},
		subtitle2: {
			fontFamily
		}
	}
});

export { astro, getDesignTokens };
