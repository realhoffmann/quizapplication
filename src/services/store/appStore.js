import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
    state: () => ({
        selectedCategory: String,
    }),

    actions: {
        setSelectedCategory(category) {
            this.selectedCategory = category;
        },
        getSelectedCategory() {
            return this.selectedCategory;
        }
    },
});
