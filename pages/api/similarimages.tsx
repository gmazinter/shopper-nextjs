import { NextApiRequest, NextApiResponse } from 'next';
import { Base64 } from 'js-base64';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const vision = require('@google-cloud/vision');

	const keyFilename = process.env.CREDENTIALS_PATH;
	const googleClientConfig =
		process.env.CURRENT_ENV === 'development'
			? { keyFilename }
			: {
					credentials: JSON.parse(
						Base64.decode(process.env.GCLOUD_CREDENTIALS)
					),
			  };
	const client = new vision.ImageAnnotatorClient(googleClientConfig);

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
