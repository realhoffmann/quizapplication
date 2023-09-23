<!-- src/components/Counter.vue -->

<template>
    <div>
        <p>Count: {{ count }}</p>
        <button @click="increment">Increment</button>
        <button @click="decrement">Decrement</button>
    </div>
</template>
  
<script>
import { useAppStore } from '../store/store'; // Import the Pinia store

export default {
    setup() {
        const store = useAppStore(); // Create an instance of the Pinia store

        return {
            count: store.count, // Access state from the store
            increment: store.increment, // Access store actions
            decrement: store.decrement,
        };
    },
};
</script>
  