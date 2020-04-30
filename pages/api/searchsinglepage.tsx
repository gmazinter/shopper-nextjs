import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { pageUrl, countryCodes } = req.query;
		const response = await axios.get(process.env.cseUri, {
			params: {
				key: process.env.cseKey,
				cx: process.env.cseId,
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
