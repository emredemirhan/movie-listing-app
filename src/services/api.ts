import axios from 'axios';
import type { MovieApiResponse } from '@/types/movie';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
