import axios from 'axios';
import type { MovieApiResponse } from '@/types/movie';

const API_BASE_URL = 'https://jsonmock.hackerrank.com/api/movies';

export const getMovies = async (page = 1): Promise<MovieApiResponse> => {
    const response = await axios.get<MovieApiResponse>(`${API_BASE_URL}/?page=${page}`);
    return response.data;
};

export const searchMovies = async (title: string, page = 1): Promise<MovieApiResponse> => {
    const response = await axios.get<MovieApiResponse>(
        `${API_BASE_URL}/search/?Title=${encodeURIComponent(title)}&page=${page}`
    );
    return response.data;
};
