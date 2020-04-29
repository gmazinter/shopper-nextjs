import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
	overrides: {
		MuiFormControl: {
			root: {
				flexDirection: 'unset',
				margin: null
			}
		},
		MuiOutlinedInput: {
			root: {
				flex: 1
			},
			input: {
				padding: '6px',
				flex: 1
			}
		},
		MuiButtonBase: {
			root: {
				// margin: null
			}
		}
	}
});
