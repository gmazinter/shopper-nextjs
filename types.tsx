export type Result = {
	title: string;
	snippet: string;
	formattedUrl: string;
	pagemap: {
		cse_image?: [
			{
				src: string;
			}
		];
		product?: {
			name: string;
		}[];
		offer?: {
			pricecurrency: string;
			price: string;
			availability: string;
		}[];
		metatags?: {}[];
	};
	link: string;
	displayLink: string;
};

export type Product = {
	websiteTitle: string;
	url: string;
	imageUri: string | null;
	name: string | null;
	price: {
		amount: string;
		currency: string;
	} | null;
	infoTags: InfoTag[];
	labels?: string[];
	isFavorite: boolean;
};

export type Direction = 'NEXT' | 'PREVIOUS';

type InfoTag = {
	title: string;
	value: string;
	color?: string;
};
