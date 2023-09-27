<template>
  <div>
    <NavBar />
    <div class="container">
      <router-view></router-view>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    NavBar,
    FooterComponent
  }
};
</script>
