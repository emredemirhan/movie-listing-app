<template>
   <div class="movie-list-container">
      <h1>Favorites</h1>
      <div v-if="favoritesStore.favorites.length" class="movie-grid">
        <MovieItem
          v-for="movie in favoritesStore.favorites"
          :key="movie.imdbID"
          :movie="movie"
        />
      </div>
      <p v-else>No favorites yet.</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useFavoritesStore } from '@/stores/favorites';
  import MovieItem from './MovieItem.vue';
  
  const favoritesStore = useFavoritesStore();
  </script>

  