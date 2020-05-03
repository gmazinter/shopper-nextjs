import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { pageUrl, countryCodes } = req.query;
		const response = await axios.get(process.env.CSE_URI, {
			params: {
				key: process.env.CSE_KEY,
				cx: process.env.CSE_ID,
				q: pageUrl,
				cr: countryCodes,
			},
		});
		res.send(response.data);
	} catch (e) {
		// res.send(e);
		throw e;
	}
};
