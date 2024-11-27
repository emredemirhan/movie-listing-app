<template>
    <div class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </template>

  <style scoped lang="scss">
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  
    .spinner {
      border: 8px solid #f3f3f3;
      border-top: 8px solid #42b983;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1s linear infinite;
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  