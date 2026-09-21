'use client'

import {
    createContext,
    useContext,
    useState
} from "react";

type TSearchStore = {
	sort: string;
	setSort: React.Dispatch<React.SetStateAction<string>>;

    genres: string[];
    addGenre: (genreID: string) => void;
	removeGenre: (genreID: string) => void;
	clearGenres: () => void;
	initGenres: (genredIDs: string[]) => void;

	type: string;
	setType: React.Dispatch<React.SetStateAction<string>>;

    yearFrom: string;
	yearTo: string;
	setYearFrom: React.Dispatch<React.SetStateAction<string>>;
	setYearTo: React.Dispatch<React.SetStateAction<string>>;

	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;

	publisher: string;
	setPublisher: React.Dispatch<React.SetStateAction<string>>;

	rating: string;
	setRating: React.Dispatch<React.SetStateAction<string>>;

	resetFilter: () => void;
}

const SearchContext = createContext<TSearchStore | undefined>(undefined);

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [sort, setSort] = useState("Популярные")
    const [genres, setGenres] = useState<string[]>([])
    const [type, setType] = useState("")
    const [yearFrom, setYearFrom] = useState("")
    const [yearTo, setYearTo] = useState("")
    const [status, setStatus] = useState("")
    const [publisher, setPublisher] = useState("")
    const [rating, setRating] = useState("")

    function addGenre(genreID: string) {
        setGenres(prev => [...prev, genreID])
    }

    function removeGenre(genreID: string) {
        setGenres(prev => prev.filter(item => item !== genreID))
    }

    function clearGenres() {
        setGenres([])
    }

    function initGenres(genredIDs: string[]) {
        setGenres(genredIDs)
    }

    function resetFilter() {
        setSort("Популярные")
        setGenres([])
        setType("")
        setYearFrom("")
        setYearTo("")
        setStatus("")
        setPublisher("")
        setRating("")
    }
    
    return (
        <SearchContext.Provider
        value={{
        sort,
        setSort,

        genres,
        addGenre,
        removeGenre,
        clearGenres,
        initGenres,

        type,
        setType,

        yearFrom,
        yearTo,
        setYearFrom,
        setYearTo,

        status,
        setStatus,

        publisher,
        setPublisher,

        rating,
        setRating,

        resetFilter
        }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export { SearchProvider };

export function useSearchContext() {
    const ctx = useContext(SearchContext);
    if (ctx === undefined) {
        throw new Error("useSearchContext must be used inside SearchProvider");
    }
    return ctx;
}