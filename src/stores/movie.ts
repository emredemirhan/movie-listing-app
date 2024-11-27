import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Movie } from '@/types/movie';
import { getMovies, searchMovies } from '@/services/api';

export const useMoviesStore = defineStore('movies', () => {
    const movies = ref<Movie[]>([]);
    const totalPages = ref(0);
    const currentPage = ref(1);
    const searchQuery = ref('');

    const fetchMovies = async () => {
        const data = searchQuery.value
            ? await searchMovies(searchQuery.value, currentPage.value)
            : await getMovies(currentPage.value);
        movies.value = data.data;
        totalPages.value = data.total_pages;
    };

    return {
        movies,
        totalPages,
        currentPage,
        searchQuery,
        fetchMovies,
    };
});
