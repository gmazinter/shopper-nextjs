import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { countryCodes, searchValue, searchType, start } = req.query;
	try {
		const params = {
			key: process.env.CSE_KEY,
			cx: process.env.CSE_ID,
			q: searchValue,
			start,
			cr: countryCodes,
			searchType: searchType === 'image' ? 'image' : undefined,
		};
		const response = await axios.get(process.env.CSE_URI, { params });
		res.send(response.data);
	} catch (e) {
		// res.send(e);
		throw e;
	}
};
