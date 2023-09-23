// src/store/store.ts

import { defineStore } from 'pinia';

// Define the state structure
interface AppState {
    count: number;
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
    },
});
