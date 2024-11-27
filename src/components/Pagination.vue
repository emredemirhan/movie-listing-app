<template>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        Previous
      </button>
      <span class="info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    currentPage: number;
    totalPages: number;
  }>();
  const emits = defineEmits(['page-changed']);
  
  const changePage = (page: number) => {
    if (page >= 1 && page <= props.totalPages) {
      emits('page-changed', page);
    }
  };
  </script>
  
  <style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;


  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius:5px;
    padding:16px;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background-color: var(--accent-color);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .icon {
      width: 18px;
      height: 18px;
    }
  }

  .info {
    margin: 0 1rem;
    font-size: 0.9rem;
    color: var(--primary-color);
  }

}
  </style>
  