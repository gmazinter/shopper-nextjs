import React from 'react';

type SearchState = {
    searchValue: string | null;
    searchResults: {} | null;
    setSearchValue: (value: string) => void;
    setSearchResults: (results: {}) => void;
};

export const SearchState: SearchState = {
    searchValue: null,
    searchResults: null,
    setSearchValue: function(value) {
        console.log(value);
        this.searchValue = value
    },
    setSearchResults: function(results) {
        console.log(results);
        this.searchResults = results
    }
};

export const SearchContext = React.createContext(SearchState);