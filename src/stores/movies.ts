import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Movie, MovieApiResponse } from '@/types/movie';
import { getMovies, searchMovies } from '@/services/api';

export const useMoviesStore = defineStore('movies', () => {
    const movies = ref<Movie[]>([]);
    const totalPages = ref(0);
    const currentPage = ref(1);
    const searchQuery = ref('');
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const fetchMovies = async () => {
        isLoading.value = true; // **Set loading to true before API call**
        error.value = null; // **Reset error state**
        try {
            const data: MovieApiResponse = searchQuery.value
                ? await searchMovies(searchQuery.value, currentPage.value)
                : await getMovies(currentPage.value);
            movies.value = data.data;
            totalPages.value = data.total_pages;
        } catch (err) {
            console.error(err);
            error.value = 'Failed to fetch movies. Please try again.';
        } finally {
            isLoading.value = false; // **Set loading to false after API call**
        }
    };

    return {
        movies,
        totalPages,
        currentPage,
        searchQuery,
        isLoading,
        error,
        fetchMovies,
    };
});
