export type Result = {
	title: string;
	snippet: string;
	link: string;
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

export type Price = {
	amount: number;
	currency: string;
};
export type Availability = 'IN_STOCK' | 'OUT_OF_STOCK' | undefined;

export type Product = {
	websiteTitle: string;
	url: string;
	imageUri: string | null;
	name: string | null;
	price: Price | null;
	infoTags: string[];
	labels?: string[];
	isFavorite: boolean;
	section: 'products' | 'similarImagesProducts';
};

export type Direction = 'NEXT' | 'PREVIOUS';

type InfoTag = {
	title: string;
	value: string;
	color?: string;
};

export type Dispatch = ({ type, payload }: DispatchProps) => void;
export type DispatchProps = { type: string; payload?: {} };
