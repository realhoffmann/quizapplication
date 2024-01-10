<template>
  <button @click="handleClick" class="category-button" :aria-label="'Category ' + category + ' Button'">{{ category }}</button>
</template>

<script>
export default {
  props: {
    category: String,
  },
  methods: {
    handleClick() {
      this.$emit('categoryClicked', this.category);
    },
  },
};
</script>
