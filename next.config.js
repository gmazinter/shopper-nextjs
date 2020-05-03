require('dotenv').config();

module.exports = {
	env: {
		CURRENT_ENV: process.env.NODE_ENV,
		GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
		CREDENTIALS_PATH: process.env.CREDENTIALS_PATH,
		CSE_URI: process.env.CSE_URI,
		CSE_KEY: process.env.CSE_KEY,
		CSE_ID: process.env.CSE_ID,
	},
};
