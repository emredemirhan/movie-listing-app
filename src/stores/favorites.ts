import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Movie } from '@/types/movie';

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref<Movie[]>([]);

    const loadFavorites = () => {
        const stored = localStorage.getItem('favorites');
        if (stored) favorites.value = JSON.parse(stored);
    };

    const saveFavorites = () => {
        localStorage.setItem('favorites', JSON.stringify(favorites.value));
    };

    const toggleFavorite = (movie: Movie) => {
        const index = favorites.value.findIndex((m) => m.imdbID === movie.imdbID);
        if (index === -1) {
            favorites.value.push(movie);
        } else {
            favorites.value.splice(index, 1);
        }
    };

    loadFavorites();

    watch(favorites, saveFavorites, { deep: true });

    return {
        favorites,
        toggleFavorite,
    };
});
