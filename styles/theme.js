//corresponding to material-ui default breakpoints
const breakpoints = ['600px', '960px', '1280px', '1920px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const zIndices = [0, 1, 2, 3, 4, 5, 10, 20, 50, 100];
zIndices.background = zIndices[0];
zIndices.content = zIndices[1];
zIndices.important = zIndices[5];
zIndices.popover = zIndices[6];
zIndices.modal = zIndices[7];
zIndices.highest = zIndices[8];

export default {
	fontSizes: [8, 12, 14, 16, 20, 24, 32, 40, 56, 64],
	space: [0, 4, 8, 16, 32, 64, 128, 256],
	colors: {
		primary: 'rgb(220, 0, 78)',
	},

	breakpoints,

	mediaQueries: {
		small: `@media screen and (min-width: ${breakpoints.sm})`,
		medium: `@media screen and (min-width: ${breakpoints.md})`,
		large: `@media screen and (min-width: ${breakpoints.lg})`,
		extraLarge: `@media screen and (min-width: ${breakpoints})`,
	},

	shadows: {
		small: '0 0 10px 2px #dbdbdb',
		smallSharp: '0 0 12px -2px #dbdbdb',
		medium: '0 0 20px -2px #dbdbdb',
		// large:
	},
	radii: [0, 4, 8, 16, 32],

	zIndices,
};
