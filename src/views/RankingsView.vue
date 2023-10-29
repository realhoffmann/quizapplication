<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="rankings">
      <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Quiz ID: {{ dataFromStore.requestId }}</div>
            <div class="fw-bold">Duration: {{ dataFromStore.duration }}s</div>
            <div class="fw-bold">Category: {{ dataFromStore.category }}</div>
          </div>
          <div class="d-flex flex-column align-items-center">
            <div class="fw-bold">Score</div>
            <p class="badge rounded-pill">{{ dataFromStore.points }}</p>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "@/services/store/appStore";

export default {
  name: "RankingsView",
  computed: {
    dataFromStore() {
      const store = useAppStore();
      return {
        requestId: store.getRequestId()?.toString() || "",
        points: store.getPoints()?.toString() || "",
        category: store.getSelectedCategory()?.toString() || "",
        duration: store.getQuizDuration()?.toString() || "",
      };
    },
  },
};
</script>
