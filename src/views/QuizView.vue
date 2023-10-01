<template>
    <div class="home">
        <h1>Let's Play!</h1>
    </div>
    <div>
        <QuestionComponent />
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
  
<script>
import QuestionComponent from '@/components/QuestionComponent.vue';

export default {
    components: {
        QuestionComponent
    }
};
</script>
  