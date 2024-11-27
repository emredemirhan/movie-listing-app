// movies.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getMovies, searchMovies } from './api'; // Adjust the import path as needed
import type { MovieApiResponse } from '@/types/movie';
import {
    mockGetMoviesPage1Response,
    mockGetMoviesPage2Response,
    mockSearchMoviesPage1Response,
    mockSearchMoviesPage2Response
} from '@/mocks/moviesMockData';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('Movies API - Enhanced Pagination Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getMovies', () => {
        it('should fetch movies for the default page (page 1)', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: mockGetMoviesPage1Response });

            const result = await getMovies();

            expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonmock.hackerrank.com/api/movies/?page=1');
            expect(result).toEqual(mockGetMoviesPage1Response);
        });

        it('should fetch movies for page 2', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: mockGetMoviesPage2Response });

            const result = await getMovies(2);

            expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonmock.hackerrank.com/api/movies/?page=2');
            expect(result).toEqual(mockGetMoviesPage2Response);
        });

        it('should handle fetching all available pages sequentially', async () => {
            // Mock sequential responses
            mockedAxios.get
                .mockResolvedValueOnce({ data: mockGetMoviesPage1Response })
                .mockResolvedValueOnce({ data: mockGetMoviesPage2Response });

            // Fetch page 1
            const resultPage1 = await getMovies();
            expect(mockedAxios.get).toHaveBeenNthCalledWith(1, 'https://jsonmock.hackerrank.com/api/movies/?page=1');
            expect(resultPage1).toEqual(mockGetMoviesPage1Response);

            // Fetch page 2
            const resultPage2 = await getMovies(2);
            expect(mockedAxios.get).toHaveBeenNthCalledWith(2, 'https://jsonmock.hackerrank.com/api/movies/?page=2');
            expect(resultPage2).toEqual(mockGetMoviesPage2Response);
        });

        it('should handle requesting a page beyond total_pages', async () => {
            const invalidPage = 3;
            const mockInvalidPageResponse: MovieApiResponse = {
                page: invalidPage,
                per_page: 10,
                total: 20,
                total_pages: 2,
                data: [], // No data for page 3
            };
            mockedAxios.get.mockResolvedValueOnce({ data: mockInvalidPageResponse });

            const result = await getMovies(invalidPage);

            expect(mockedAxios.get).toHaveBeenCalledWith(`https://jsonmock.hackerrank.com/api/movies/?page=${invalidPage}`);
            expect(result).toEqual(mockInvalidPageResponse);
            expect(result.data).toHaveLength(0);
        });

        it('should handle API errors gracefully', async () => {
            const errorMessage = 'Network Error';
            mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(getMovies()).rejects.toThrow(errorMessage);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonmock.hackerrank.com/api/movies/?page=1');
        });
    });

    describe('searchMovies', () => {
        it('should search movies with the given title and default page (page 1)', async () => {
            const title = 'Waterworld';
            mockedAxios.get.mockResolvedValueOnce({ data: mockSearchMoviesPage1Response });

            const result = await searchMovies(title);

            const encodedTitle = encodeURIComponent(title);
            expect(mockedAxios.get).toHaveBeenCalledWith(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodedTitle}&page=1`);
            expect(result).toEqual(mockSearchMoviesPage1Response);
        });

        it('should search movies with the given title and specific page (page 2)', async () => {
            const title = 'Waterworld';
            mockedAxios.get.mockResolvedValueOnce({ data: mockSearchMoviesPage2Response });

            const result = await searchMovies(title, 2);

            const encodedTitle = encodeURIComponent(title);
            expect(mockedAxios.get).toHaveBeenCalledWith(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodedTitle}&page=2`);
            expect(result).toEqual(mockSearchMoviesPage2Response);
        });

        it('should handle searching across all available pages sequentially', async () => {
            const title = 'Waterworld';
            mockedAxios.get
                .mockResolvedValueOnce({ data: mockSearchMoviesPage1Response })
                .mockResolvedValueOnce({ data: mockSearchMoviesPage2Response });

            // Search page 1
            const resultPage1 = await searchMovies(title);
            const encodedTitle = encodeURIComponent(title);
            expect(mockedAxios.get).toHaveBeenNthCalledWith(1, `https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodedTitle}&page=1`);
            expect(resultPage1).toEqual(mockSearchMoviesPage1Response);

            // Search page 2
            const resultPage2 = await searchMovies(title, 2);
            expect(mockedAxios.get).toHaveBeenNthCalledWith(2, `https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodedTitle}&page=2`);
            expect(resultPage2).toEqual(mockSearchMoviesPage2Response);
        });

        it('should handle searching with a page beyond total_pages', async () => {
            const title = 'Waterworld';
            const invalidPage = 3;
            const mockInvalidPageResponse: MovieApiResponse = {
                page: invalidPage,
                per_page: 10,
                total: 15,
                total_pages: 2,
                data: [], // No data for page 3
            };
            mockedAxios.get.mockResolvedValueOnce({ data: mockInvalidPageResponse });

            const result = await searchMovies(title, invalidPage);

            const encodedTitle = encodeURIComponent(title);
            expect(mockedAxios.get).toHaveBeenCalledWith(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodedTitle}&page=${invalidPage}`);
            expect(result).toEqual(mockInvalidPageResponse);
            expect(result.data).toHaveLength(0);
        });

        it('should handle API errors gracefully during search', async () => {
            const title = 'Waterworld';
            const errorMessage = 'Network Error';
            mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(searchMovies(title)).rejects.toThrow(errorMessage);

            const encodedTitle = encodeURIComponent(title);
            expect(mockedAxios.get).toHaveBeenCalledWith(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodedTitle}&page=1`);
        });
    });
});
