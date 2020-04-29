export const useWindow = () => {
    const scrollToTop = () => { window.scrollTo(0, 0) };

    return {
        scrollToTop,
    }
};