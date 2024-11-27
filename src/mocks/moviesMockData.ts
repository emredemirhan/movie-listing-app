import type { MovieApiResponse } from '@/types/movie';
export const mockGetMoviesPage1Response: MovieApiResponse = {
    page: 1,
    per_page: 10,
    total: 20,
    total_pages: 2,
    data: [
        { Title: "The Shawshank Redemption", Year: 1994, imdbID: "tt0111161" },
        { Title: "The Godfather", Year: 1972, imdbID: "tt0068646" },
        { Title: "The Dark Knight", Year: 2008, imdbID: "tt0468569" },
        { Title: "Pulp Fiction", Year: 1994, imdbID: "tt0110912" },
        { Title: "Schindler's List", Year: 1993, imdbID: "tt0108052" },
        { Title: "The Lord of the Rings: The Return of the King", Year: 2003, imdbID: "tt0167260" },
        { Title: "Forrest Gump", Year: 1994, imdbID: "tt0109830" },
        { Title: "Inception", Year: 2010, imdbID: "tt1375666" },
        { Title: "Fight Club", Year: 1999, imdbID: "tt0137523" },
        { Title: "The Matrix", Year: 1999, imdbID: "tt0133093" }
    ]
};


export const mockGetMoviesPage2Response: MovieApiResponse = {
    page: 2,
    per_page: 10,
    total: 20,
    total_pages: 2,
    data: [
        { Title: "Se7en", Year: 1995, imdbID: "tt0114369" },
        { Title: "The Silence of the Lambs", Year: 1991, imdbID: "tt0102926" },
        { Title: "Interstellar", Year: 2014, imdbID: "tt0816692" },
        { Title: "The Green Mile", Year: 1999, imdbID: "tt0120689" },
        { Title: "Gladiator", Year: 2000, imdbID: "tt0172495" },
        { Title: "The Prestige", Year: 2006, imdbID: "tt0482571" },
        { Title: "The Lion King", Year: 1994, imdbID: "tt0110357" },
        { Title: "The Departed", Year: 2006, imdbID: "tt0407887" },
        { Title: "Whiplash", Year: 2014, imdbID: "tt2582802" },
        { Title: "The Wolf of Wall Street", Year: 2013, imdbID: "tt0993846" }
    ]
};

export const mockSearchMoviesPage1Response: MovieApiResponse = {
    page: 1,
    per_page: 10,
    total: 15,
    total_pages: 2,
    data: [
        { Title: "Waterworld", Year: 1995, imdbID: "tt0114898" },
        { Title: "Waterworld: Secrets of the Deep", Year: 1996, imdbID: "tt0168982" },
        { Title: "The Making of Waterworld", Year: 1995, imdbID: "tt2670548" },
        { Title: "Waterworld: Extended Cut", Year: 1997, imdbID: "tt0415895" },
        { Title: "Swordquest: Waterworld", Year: 1983, imdbID: "tt2761086" },
        { Title: "Waterworld: Survival Adventure", Year: 2001, imdbID: "tt0381702" },
        { Title: "Louise's Waterworld", Year: 1997, imdbID: "tt0298417" },
        { Title: "Behind the Waterworld Curtain", Year: 2003, imdbID: "tt0455840" },
        { Title: "Waterworld Diaries", Year: 2005, imdbID: "tt0390617" },
        { Title: "Discovering Waterworld", Year: 2014, imdbID: "tt5847056" }
    ]
};

export const mockSearchMoviesPage2Response: MovieApiResponse = {
    page: 2,
    per_page: 10,
    total: 15,
    total_pages: 2,
    data: [
        { Title: "Deep Waterworld Exploration", Year: 1997, imdbID: "tt0124365" },
        { Title: "The Waterworld Legacy", Year: 1999, imdbID: "tt0161077" },
        { Title: "Waterworld: A New Adventure", Year: 2010, imdbID: "tt1785572" },
        { Title: "Rediscovering Waterworld", Year: 2012, imdbID: "tt2233044" },
        { Title: "Amazing Waterworld Stories", Year: 2009, imdbID: "tt1433184" },
        { Title: "Hollywood's Waterworld Secrets", Year: 2006, imdbID: "tt2158533" }
    ]
};
