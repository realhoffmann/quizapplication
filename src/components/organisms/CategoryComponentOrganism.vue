<!-- CategoryComponent.vue -->

<template>
    <div class="home">
        <h1>Choose a category</h1>
    </div>
    <CategoryButtonContainer>
        <CategoryButton @navigate="navigateTo('/quiz')">Sports</CategoryButton>
        <CategoryButton @navigate="navigateTo('/quiz')">Geography</CategoryButton>
    </CategoryButtonContainer>
    <CategoryButtonContainer>
        <CategoryButton @navigate="navigateTo('/quiz')">History</CategoryButton>
        <CategoryButton @navigate="navigateTo('/quiz')">Culture</CategoryButton>
    </CategoryButtonContainer>
    <CategoryButtonContainer>
        <CategoryButton @navigate="navigateTo('/quiz')">Science</CategoryButton>
        <CategoryButton @navigate="navigateTo('/quiz')">Nature</CategoryButton>
    </CategoryButtonContainer>
</template>

<script>
import CategoryButton from '../atoms/CategoryButtonAtom.vue';
import CategoryButtonContainer from '../molecules/CategoryButtonContainerMolecule.vue';

export default {
    name: "CategoryComponent",
    components: {
        CategoryButton,
        CategoryButtonContainer,
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
    },
};
</script>