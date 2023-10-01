<template>
    <audio id= "track" ref="audio" autoplay loop>
      <source :src="currentTrack" type="audio/mpeg">
    </audio>
</template>
  
  <script>
  export default {
    data() {
      return {
        currentTrack: 'https://soundimage.org/wp-content/uploads/2016/10/Arcade-Fantasy.mp3',
      };
    },
    methods: {
      playMusic(src) {
        this.$refs.audio.src = src;
        this.$refs.audio.play();
      },
    },
    changeTrack(track) {
      this.currentTrack = track;
      this.playMusic(this.currentTrack);
    },
  };
  </script>
  