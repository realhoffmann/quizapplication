
<template>
  <div class="ms-2 me-auto">
    <p class="fw-bold">Nickname: <span aria-label="Nickname">{{ nickname }}</span></p>
    <p class="fw-bold">Duration: <span aria-label="Duration">{{ duration }} seconds</span></p>
  </div>
</template>


<script>
export default {
  props: {
    nickname: String,
    duration: String,
  },
};
</script>