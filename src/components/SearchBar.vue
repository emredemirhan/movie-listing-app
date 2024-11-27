<template>
    <div class="search-wrapper">
      <Search class="search-icon" />
      <input
        type="search"
        v-model="searchQuery"
        placeholder="Search movies..."
        @input="debouncedSearch"
      />
    </div>
  </template>
    
  <script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Search } from 'lucide-vue-next';
  import { useMoviesStore } from '@/stores/movies';
    
  const moviesStore = useMoviesStore();
    
  const searchQuery = computed({
    get: () => moviesStore.searchQuery,
    set: (value) => {
      moviesStore.searchQuery = value;
    },
  });
  
  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  
  const debouncedSearch = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      moviesStore.currentPage = 1;
      moviesStore.fetchMovies();
    }, 300); 
  };
  </script>
    
  <style scoped lang="scss">
  .search-wrapper {
    position: relative;
    width: 100%;
    max-width: 100%;
  }
  
  input {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
    background-color: #f9f9f9;
  
    &:focus {
      border-color: var(--accent-color);
      box-shadow: 0 0 8px rgba(74, 144, 226, 0.2);
    }
  
    &::placeholder {
      color: #a0a0a0;
      transition: color 0.3s ease;
    }
  
    &:hover {
      border-color: var(--accent-color);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #a0a0a0;
    pointer-events: none;
  }
  </style>