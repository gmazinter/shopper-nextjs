import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// const keyFilename = './International Shopper-cce579bf5b0b.json';
	const vision = require('@google-cloud/vision');
	const client = new vision.ImageAnnotatorClient();

	const features = [
		{ type: 'LABEL_DETECTION' },
		{ type: 'LOGO_DETECTION' },
		{ type: 'WEB_DETECTION' },
	];

	const imageRequest = {
		image: {
			source: {
				imageUri: req.query.imageUri,
			},
		},
		features,
	};
	// this method needs to be replaced just to web-detection results
	const [result] = await client.annotateImage(imageRequest);
	res.send(result);
};
