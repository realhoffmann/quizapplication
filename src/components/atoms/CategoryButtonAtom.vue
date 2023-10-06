<template>
    <button class="category-button" @click="navigate">
        <slot></slot>
    </button>
</template>

<script>
export default {
    methods: {
        navigate() {
            this.$emit("navigate");
        },
    },
};
</script>
