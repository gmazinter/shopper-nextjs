import { useEffect, MutableRefObject } from 'react';

export const useClickOutside = (
	refs: Array<MutableRefObject<any>>,
	callback: () => void
) => {
	const handleClick = (event: Event) => {
		const target = event.target as HTMLElement;
		let isInside = false;
		if (refs) {
			refs.forEach(ref => {
				console.log(ref.current);
				if (ref.current?.contains(target)) {
					isInside = true;
				}
			});
			if (callback && !isInside) {
				callback();
			}
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, []);
};
