<template>
    <div class="movie-item">
      <div class="movie-content">
        <h2 class="movie-title">{{ movie.Title }}</h2>
        <p class="movie-year">{{ movie.Year }}</p>
        <p class="movie-imdb">IMDB ID: {{ movie.imdbID }}</p>
      </div>
      <button @click="toggleFavorite" class="favorite-button" :class="{ 'is-favorite': isFavorite }">
        <StarIcon :class="{ 'filled': isFavorite }" />
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, computed } from 'vue';
  import type { Movie } from '@/types/movie';
  import { useFavoritesStore } from '@/stores/favorites';
  import { StarIcon } from 'lucide-vue-next';
  
  const props = defineProps<{ movie: Movie }>();
  const favoritesStore = useFavoritesStore();
  
  const isFavorite = computed(() =>
    favoritesStore.favorites.some((fav) => fav.imdbID === props.movie.imdbID)
  );
  
  const toggleFavorite = () => {
    favoritesStore.toggleFavorite(props.movie);
  };
  </script>
  
  <style scoped lang="scss">
  .movie-item {
    background-color: #1a1a1a;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  }
  
  .movie-content {
    flex-grow: 1;
  }
  
  .movie-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  
  .movie-year {
    font-size: 1rem;
    color: #b3b3b3;
    margin-bottom: 0.25rem;
  }
  
  .movie-imdb {
    font-size: 0.875rem;
    color: #808080;
  }
  
  .favorite-button {
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  
    &:hover {
      transform: scale(1.1);
    }
  
    &.is-favorite {
      animation: pulse 0.5s ease-in-out;
    }
  }
  
  .favorite-button :deep(svg) {
    width: 24px;
    height: 24px;
    color: #808080;
    transition: all 0.3s ease;
  
    &.filled {
      color: #ffd700;
      fill: #ffd700;
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>