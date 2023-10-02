<template>
    <div class="home">
        <h1>Choose a category</h1>
    </div>
    <div class="button-container justify-content-evenly">
        <router-link to="/quiz" v-slot="{ navigate }">
            <button @click="navigate" class="category-button">Nature</button>
        </router-link>
        <router-link to="/quiz" v-slot="{ navigate }">
            <button @click="navigate" class="category-button">Politcs</button>
        </router-link>
    </div><br>
    <div class="button-container justify-content-evenly">
        <router-link to="/quiz" v-slot="{ navigate }">
            <button @click="navigate" class="category-button">Geography</button>
        </router-link>
        <router-link to="/" v-slot="{ navigate }">
            <button @click="navigate" class="category-button">Science</button>
        </router-link>
    </div>
    <div class="button-container justify-content-evenly">
        <router-link to="/quiz" v-slot="{ navigate }">
            <button @click="navigate" class="category-button">Entertainment</button>
        </router-link>
        <router-link to="/quiz" v-slot="{ navigate }">
            <button @click="navigate" class="category-button">Informatics</button>
        </router-link>
    </div>
</template>

