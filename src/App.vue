<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">Movie Listing App</h1>
        <nav class="app-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/favorites" class="nav-link">Favorites</router-link>
        </nav>
      </div>
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} Movie Listing App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const currentYear = computed(() => new Date().getFullYear());
</script>