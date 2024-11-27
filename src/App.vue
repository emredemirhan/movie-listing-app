<template>
  <div id="app">
    <header>
      <h1>Movie Listing App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/favorites">Favorites</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
@import '@/styles/main.scss';

#app {
  text-align: center;
}

header {
  background-color: #42b983;
  color: white;
  padding: 1rem;

  h1 {
    margin: 0;
  }

  nav {
    margin-top: 0.5rem;

    a {
      color: white;
      text-decoration: none;
      margin: 0 1rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

main {
  margin: 2rem auto;
  padding: 0 2rem;
  max-width: 800px;
}
</style>
