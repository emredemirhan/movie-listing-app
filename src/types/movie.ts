export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
}

export interface MovieApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Movie[];
}