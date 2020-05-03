import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const projectId = process.env.GOOGLE_PROJECT_ID;
	const keyFilename =
		process.env.CURRENT_ENV === 'development'
			? process.env.GCLOUD_CREDENTIALS
			: JSON.parse(atob(process.env.GCLOUD_CREDENTIALS));
	const vision = require('@google-cloud/vision');
	const client = new vision.ImageAnnotatorClient({ projectId, keyFilename });

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
