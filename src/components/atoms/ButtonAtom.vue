<template>
    <button @click:to="navigate" class:to="class">{{ description }}</button>
</template>

<script>
export default {
    name: "ButtonAtom",
    props: {
        action: {
            type: String,
            default: "navigate",
        },
        class: {
            type: String,
            default: "category-button",
        },
        description: {
            type: String,
            default: "No Description",
        },
    }
};


</script>