import Landing from '../components/homepage/Homepage';
import { GetServerSideProps } from 'next';
import Unsplash, { toJson } from 'unsplash-js';
import fetch from 'node-fetch';
global.fetch = fetch;

export default function Index({ photo }) {
	return <Landing backgroundImage={photo} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
	const unsplash = new Unsplash({
		accessKey: process.env.UNSPLASH_ACCESS_KEY,
		secret: process.env.UNSPLASH_SECERT_KEY,
	});
	const data = await unsplash.photos
		.getRandomPhoto({
			query: 'street shopping',
		})
		.then(toJson);
	const photo = data.urls.raw;
	return { props: { photo } };
};
