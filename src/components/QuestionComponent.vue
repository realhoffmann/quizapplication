<template>
    <div class="question-container">
        <div class="question">
            <h1>Question</h1><br>
            <h3>What is the capital of Hungary?</h3>
        </div>
    </div><br>
    <div class="button-container justify-content-center">
        <router-link to="/" v-slot="{ navigate }">
            <button @click="navigate" class="answer-button answerA">Budapest</button>
        </router-link>
        <router-link to="/" v-slot="{ navigate }">
            <button @click="navigate" class="answer-button answerB">Vienna</button>
        </router-link>
    </div>
    <div class="button-container justify-content-center">
        <router-link to="/" v-slot="{ navigate }">
            <button @click="navigate" class="answer-button answerC">Prague</button>
        </router-link>
        <router-link to="/" v-slot="{ navigate }">
            <button @click="navigate" class="answer-button answerD">Warsaw</button>
        </router-link>
    </div>
</template>