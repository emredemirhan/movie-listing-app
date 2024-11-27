<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
      Previous
    </button>

    <div class="page-numbers">

      <button @click="changePage(1)" :class="{ active: 1 === currentPage }">
        1
      </button>

      <span v-if="showLeftEllipsis">...</span>

      <button v-for="pageNum in middlePages" :key="pageNum" @click="changePage(pageNum)"
        :class="{ active: pageNum === currentPage }">
        {{ pageNum }}
      </button>

      <span v-if="showRightEllipsis">...</span>

      <button v-if="totalPages > 1" @click="changePage(totalPages)" :class="{ active: totalPages === currentPage }">
        {{ totalPages }}
      </button>
    </div>

    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';

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

const middlePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 3;
  const totalPages = props.totalPages;
  const currentPage = props.currentPage;

  // If total pages are less than or equal to 5, display all pages between the first and last
  if (totalPages <= 5) {
    for (let i = 2; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Calculate the start and end page numbers
  const half = Math.floor(maxVisiblePages / 2);
  let start = currentPage - half;
  let end = currentPage + half;

  // Adjust if start is less than 2
  if (start < 2) {
    start = 2;
    end = start + maxVisiblePages - 1;
  }

  // Adjust if end is greater than totalPages - 1
  if (end > totalPages - 1) {
    end = totalPages - 1;
    start = end - maxVisiblePages + 1;
  }

  // Generate the array of middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});


const showLeftEllipsis = computed(() => {
  return props.currentPage > 3;
});

const showRightEllipsis = computed(() => {
  return props.currentPage < props.totalPages - 2;
});
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column; // Stack elements vertically on mobile
    width: 100%;
    gap: 1rem;

    button {
      width: 100%;
      max-width: 200px;
    }

    .page-numbers {
      margin: 0;
      width: 100%;
      justify-content: center;
      gap: 0.5rem;

      button {
        width: 40px;
        max-width: 40px;
      }
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    padding: 16px;
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

  .page-numbers {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 1rem;

    button {
      min-width: 40px;
      height: 40px;
      padding: 0;

      &.active {
        background-color: var(--accent-color);
      }
    }
  }

}
</style>