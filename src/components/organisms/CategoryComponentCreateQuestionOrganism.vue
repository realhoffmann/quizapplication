<template>
    <div class="home">
        <h1>Choose a category</h1>
    </div>
    <CategoryButtonContainer>
        <CategoryButton @navigate="navigateTo('/create-question')">Sports</CategoryButton>
        <CategoryButton @navigate="navigateTo('/create-question')">Geography</CategoryButton>
    </CategoryButtonContainer>
    <CategoryButtonContainer>
        <CategoryButton @navigate="navigateTo('/create-question')">History</CategoryButton>
        <CategoryButton @navigate="navigateTo('/create-question')">Culture</CategoryButton>
    </CategoryButtonContainer>
    <CategoryButtonContainer>
        <CategoryButton @navigate="navigateTo('/create-question')">Science</CategoryButton>
        <CategoryButton @navigate="navigateTo('/create-question')">Nature</CategoryButton>
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