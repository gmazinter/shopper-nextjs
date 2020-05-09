import React, { useEffect } from 'react';
import {
	ThemeProvider as MuiThemeProvider,
	StylesProvider,
} from '@material-ui/core/styles';
import theme from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import MuiOverrides from '../styles/muiOverrides';
import { SearchStateProvider } from '../states/SearchState';
import { ProductStateProvider } from '../states/ProductState';
import Layout from '../components/Layout';
import '../styles/globalStyles.css';

export default function App({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}, []);

	return (
		<StylesProvider injectFirst>
			<MuiThemeProvider theme={MuiOverrides}>
				<ThemeProvider theme={theme}>
					<SearchStateProvider>
						<ProductStateProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ProductStateProvider>
					</SearchStateProvider>
				</ThemeProvider>
			</MuiThemeProvider>
		</StylesProvider>
	);
}
