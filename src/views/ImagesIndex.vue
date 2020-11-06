<template>
  <div class="images-index">
    <div v-for="image in images">
      <p>Url: {{ image.url }}</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      images: [],
    };
  },
  created: function() {
    this.indexImages();
  },
  methods: {
    indexImages: function() {
      axios.get("/api/images").then((response) => {
        console.log(response.data);
        this.images = response.data;
      });
    },
  },
};
</script>
