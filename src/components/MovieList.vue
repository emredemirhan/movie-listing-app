<template>
    <div class="movie-list-container">
      <SearchBar class="search-bar" />
      <Transition name="fade" mode="out-in">
        <Loading v-if="moviesStore.isLoading"/>
        <div v-else>
            <div v-if="moviesStore.error" class="error-message">
              <AlertCircleIcon class="error-icon" />
              {{ moviesStore.error }}
            </div>
            <div v-else-if="moviesStore.movies.length === 0" class="no-results">
              <SearchIcon class="no-results-icon" />
              <p>No movies found. Try a different search term.</p>
            </div>
            <div v-else class="movie-grid">
                <MovieItem
                  v-for="movie in moviesStore.movies"
                  :key="movie.imdbID"
                  :movie="movie"
                />
            </div>
          <Pagination
            v-if="moviesStore.totalPages > 1"
            :current-page="moviesStore.currentPage"
            :total-pages="moviesStore.totalPages"
            @page-changed="onPageChanged"
            class="pagination"
          />
        </div>
      </Transition>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, watch } from 'vue';
  import { useMoviesStore } from '@/stores/movies';
  import MovieItem from './MovieItem.vue';
  import Pagination from './Pagination.vue';
  import SearchBar from './SearchBar.vue';
  import Loading from './Loading.vue';
  import { AlertCircleIcon, SearchIcon } from 'lucide-vue-next';
  
  const moviesStore = useMoviesStore();
  
  onMounted(() => {
    moviesStore.fetchMovies();
  });
  
  const onPageChanged = (page: number) => {
    moviesStore.currentPage = page;
    moviesStore.fetchMovies();
  };
  
  watch(() => moviesStore.searchTerm, () => {
    moviesStore.currentPage = 1;
    moviesStore.fetchMovies();
  });
  </script>
  
  <style scoped lang="scss">
  .movie-list-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .search-bar {
    margin-bottom: 2rem;
  }
  
  .error-message {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff4d4d;
    font-size: 1.2rem;
    text-align: center;
    margin: 2rem 0;
    padding: 1rem;
    background-color: rgba(255, 77, 77, 0.1);
    border-radius: 8px;
  }
  
  .error-icon {
    margin-right: 0.5rem;
  }
  
  .no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #808080;
    font-size: 1.2rem;
    text-align: center;
    margin: 2rem 0;
  }
  
  .no-results-icon {
    margin-bottom: 1rem;
    width: 48px;
    height: 48px;
  }
  
  
  .pagination {
    margin-top: 2rem;
  }
  
  // Transitions
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  @media (max-width: 768px) {
    .movie-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
  }
  </style>
  