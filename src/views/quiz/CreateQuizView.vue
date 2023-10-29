<template>
    <div class="home">
        <h1>Create Quiz!</h1>
    </div>
    <CategoryComponent @categoryClicked="handleCategoryClicked"/>
</template>

<script>
import CategoryComponent from '@/components/CategoryComponent.vue';
import {useAppStore} from "@/services/store/appStore";


export default {
    components: {
        CategoryComponent
    },

  methods: {
    handleCategoryClicked(category) {
      const store = useAppStore();
      store.setSelectedCategory(category);

      this.$router.push({
        name: "create-question",
        params: { category: category },
      });
    }
  }
};
</script>

